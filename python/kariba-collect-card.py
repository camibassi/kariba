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
    jogada = event['position']  # Jogada realizada
    qtd    = event['quantity']  # Quantidade de cartas da jogada

    print( "Minha Jogada", game_id, player, jogada, qtd);
    try:
        # Verificar e coletar cartas do board
        response = check_and_collect_cards(game_id, player, jogada)
        return response

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Erro: {str(e)}')
        }

def check_and_collect_cards(game_id, player, jogada):
    # Consultar a tabela kariba-board para o jogo específico
    board_response = board_table.scan(
        FilterExpression=Attr('gameId').eq(game_id)
    )
    items_to_collect = board_response['Items']
    if not items_to_collect:
        return {
            'statusCode': 400,
            'body': json.dumps('Nenhuma carta com quantidade igual ou superior a 3 encontrada.')
        }

    coletar = False;
    if( jogada > 1 ):
        # Ordena as posições de forma decrescente
        items_to_collect = sorted(items_to_collect, key=lambda x: int(x['position']), reverse=True )
        for item in items_to_collect:
            position = item['position']
            quantity = item['quantity']

            # Se a posição for maior que a jogada, pula para o proximo
            if( position > jogada ):
                continue;

            # Verifica a jogada atual se acionaremos o coletor
            if( int(position) == int(jogada) and quantity >= 3):
                coletar = True;
                continue;

            if( coletar == True and quantity >= 1):
                # Atualizar a pontuação do jogador apenas com o número de cartas do animal espantado
                update_board(game_id, player, position, quantity)
                return {
                    'statusCode': 200,
                    'body': json.dumps('Animal próximo mais fraco espantado com sucesso.')
                }

    if( jogada == 1 ):
        items_to_collect = sorted(items_to_collect, key=lambda x: int(x['position']) )
        for item in items_to_collect:
            position = item['position']
            quantity = item['quantity']

            if( position == jogada and quantity >= 3 ):
                coletar = True;
                continue;
            if( position == 8 and coletar == True and quantity >= 1):
                
                # Atualizar a pontuação do jogador apenas com o número de cartas do animal espantado
                update_board(game_id, player, position, quantity)
                return {
                    'statusCode': 200,
                    'body': json.dumps('Animal próximo mais fraco espantado com sucesso.')
                }
            else:
                continue;

    return {
        'statusCode': 400,
        'body': json.dumps('Nenhum animal fraco encontrado para espantar.')
    }

def update_board(game_id, player, position, quantity):
    print("Atualizando situação", game_id, player, position, quantity)
    update_score_table(game_id, player, quantity);

    # Adicionar as cartas coletadas na tabela de pontuação
    board_table.update_item(
        Key={
            'gameId': game_id,
            'position' : position
        },
        UpdateExpression='SET quantity = :val',
        ExpressionAttributeValues={
            ':val': Decimal(0)
        }
    )


def update_score_table(game_id, player, quantity):
    # Adicionar as cartas coletadas na tabela de pontuação
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
    playerNumber = scores[0]['playerNumber']
    return playerNumber
