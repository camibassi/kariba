import json
import boto3
from boto3.dynamodb.conditions import Key
from decimal import Decimal
import random

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')
lambda_client = boto3.client('lambda')

# Tabelas do DynamoDB
cards_table = dynamodb.Table('kariba-cards')  # Tabela de Cartas
deck_table = dynamodb.Table('kariba-deck')    # Tabela Deck

def lambda_handler(event, context):
    # Extrair os dados do payload recebido
    game_id = int(event['gameId'])  # Garantindo que gameId é um número
    player = event['player']  # O connectionId do jogador
    print(event)

    try:
        # Completar a mão do jogador
        response = complete_player_hand(game_id, player)

        return response

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Erro ao completar a mão do jogador: {str(e)}')
        }

def complete_player_hand(game_id, player):
    try:
        print(f"Consultando cartas na mão do jogador: {player}")
        # Consultar a mão do jogador
        player_hand_response = deck_table.query(
            KeyConditionExpression=Key('connectionId').eq(player)
        )
        player_hand = player_hand_response['Items']
        current_card_count = sum(int(item['quantity']) for item in player_hand)
        
        # Calcular quantas cartas faltam para completar a mão (até 5)
        cards_needed = max(0, 5 - current_card_count)
        print(f"Cartas necessárias: {cards_needed} cartas.")

        if cards_needed > 0:
            # Obter cartas disponíveis na tabela de cartas
            available_cards_response = cards_table.query(
                KeyConditionExpression=Key('gameId').eq(game_id)
            )
            available_cards = available_cards_response['Items']
            
            # Filtrar cartas com quantidade > 0
            cards_to_draw = [card for card in available_cards if float(card['quantity']) > 0]
            if not cards_to_draw:
                return {
                    'statusCode': 400,
                    'body': json.dumps('Não há cartas disponíveis para distribuir.')
                }

            # Selecionar as cartas necessárias (ou as que restam)
            selected_cards = random.sample(cards_to_draw, min(cards_needed, len(cards_to_draw)))
            print(f"Cartas selecionadas para adicionar à mão: {selected_cards}")

            for card in selected_cards:
                card_id = int(card['cardId'])
                # Verificar se o item existe na mão do jogador
                response = deck_table.get_item(
                    Key={
                        'connectionId': player,
                        'cardId': card_id
                    }
                )

                if 'Item' in response:
                    # Incrementar a quantidade se a carta já estiver na mão
                    deck_table.update_item(
                        Key={
                            'connectionId': player,
                            'cardId': card_id
                        },
                        UpdateExpression="SET quantity = quantity + :inc",
                        ExpressionAttributeValues={':inc': Decimal(1)}
                    )
                else:
                    # Adicionar a carta à mão se ainda não estiver, garantindo que `gameId` seja incluído
                    deck_table.put_item(
                        Item={
                            'connectionId': player,
                            'cardId': card_id,
                            'gameId': game_id,  # Inclua o gameId
                            'quantity': Decimal(1)
                        }
                    )

                # Atualizar o baralho decrementando a quantidade da carta distribuída
                cards_table.update_item(
                    Key={
                        'gameId': game_id,
                        'cardId': card_id
                    },
                    UpdateExpression="SET quantity = quantity - :dec",
                    ExpressionAttributeValues={
                        ':dec': Decimal(1),
                        ':zero': Decimal(0)
                    },
                    ConditionExpression="quantity > :zero"
                )

            return {
                'statusCode': 200,
                'body': json.dumps('Mão do jogador completada com sucesso.')
            }

        else:
            return {
                'statusCode': 200,
                'body': json.dumps('O jogador já possui 5 cartas na mão.')
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Erro ao completar a mão do jogador: {str(e)}')
        }


# Funções para invocar outras Lambdas, se necessário
def lambda_invoke_update_match(game_id):
    response = lambda_client.invoke(
        FunctionName='kariba-update-match',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id
        }, default=decimal_to_int)
    )

    print("Response from update match:", response)

def lambda_invoke_pick_card(game_id, connection_id):
    response = lambda_client.invoke(
        FunctionName='kariba-pick-card',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id,
            'connectionId': connection_id
        }, default=decimal_to_int)
    )

    print("Response from pick card:", response)

def lambda_invoke_get_game_state(game_id):
    response = lambda_client.invoke(
        FunctionName='kariba-get-game-state',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id
        }, default=decimal_to_int)
    )

    print("Response from get game state:", response)

# Função para converter Decimal para int
def decimal_to_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    raise TypeError("Type not serializable")
