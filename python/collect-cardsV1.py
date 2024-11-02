import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')

# Tabelas do DynamoDB
board_table = dynamodb.Table('kariba-board')  # Tabela do Board
score_table = dynamodb.Table('kariba-score')  # Tabela de Pontuação

def lambda_handler(event, context):
    # Extrair os dados do payload recebido
    game_id = event['gameId']  # ID do jogo
    player = event['player']    # ConnectionId do jogador

    try:
        # Verificar e coletar cartas do board
        response = check_and_collect_cards(game_id, player)
        return response

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Erro: {str(e)}')
        }

def check_and_collect_cards(game_id, player):
    # Consultar a tabela kariba-board para o jogo específico
    board_response = board_table.scan(
        FilterExpression=Attr('gameId').eq(game_id) & Attr('quantity').gte(3)
    )
    items_to_collect = board_response['Items']
    print(f"Response tabela-board {board_response}")
    if not items_to_collect:
        return {
            'statusCode': 400,
            'body': json.dumps('Nenhuma carta com quantidade igual ou superior a 3 encontrada.')
        }

    for item in items_to_collect:
        position = item['position']
        quantity = item['quantity']
        print(f"item: {item}")
        print(f"itemToCollect: {items_to_collect}")
        
        # Espantar o animal mais fraco próximo
        weak_animal_position, weak_quantity = find_weak_animal(game_id, item)
        print(f"Weak Animal Position: {weak_animal_position}, Quantity: {weak_quantity}")

        # Se houver um animal fraco próximo, atualizar sua quantidade e pontuar o jogador
        if weak_animal_position is not None:
            # Remover o animal mais fraco
            board_table.update_item(
                Key={
                    'gameId': game_id,
                    'position': weak_animal_position
                },
                UpdateExpression='SET quantity = :val',
                ExpressionAttributeValues={
                    ':val': Decimal(0)
                }
            )
            # Atualizar a pontuação do jogador apenas com o número de cartas do animal espantado
            update_score_table(game_id, player, weak_quantity)
            return {
                'statusCode': 200,
                'body': json.dumps('Animal próximo mais fraco espantado com sucesso.')
            }

    return {
        'statusCode': 400,
        'body': json.dumps('Nenhum animal fraco encontrado para espantar.')
    }

def find_weak_animal(game_id, collected_card):
    # Consultar a tabela kariba-board para encontrar o animal mais fraco próximo
    board_response = board_table.scan(
        FilterExpression=Attr('gameId').eq(game_id)
    )
    animals = board_response['Items']
    print(f"animals: {animals}")
    weak_animal = None
    collected_position = collected_card['position']

    # Determinar a posição do animal que pode ser espantado
    espanta_position = (collected_position - 1) if collected_position > 1 else 8

    # Procurar o animal mais próximo antes da posição atual
    for animal in animals:
        if animal['position'] == espanta_position:
            weak_animal = animal
            break

    # Retorna a posição e a quantidade do animal mais fraco encontrado
    return (weak_animal['position'], weak_animal['quantity']) if weak_animal else (None, None)

def update_score_table(game_id, player, quantity):
    # Adicionar as cartas coletadas na tabela de pontuação
    print(f"player: {player}")
    score_table.update_item(
        Key={
            'gameId': game_id,
            'playerNumber': get_player_number(game_id, player)  # Lógica para obter o número do jogador
        },
        UpdateExpression='SET collectedCards = collectedCards + :inc',
        ExpressionAttributeValues={
            ':inc': Decimal(quantity)  # Adiciona a quantidade coletada do animal espantado
        }
    )

def get_player_number(game_id, player):
    score_response = score_table.query(
        KeyConditionExpression=Key('gameId').eq(game_id),
        FilterExpression=Attr('connectionId').eq(player)  # Filtra pelo connectionId específico
    )
    scores = score_response['Items']
    print(f"Scores: {scores}")
    
    playerNumber = scores[0]['playerNumber']
    print(f'playerNumber: {playerNumber}')
    
    return playerNumber
