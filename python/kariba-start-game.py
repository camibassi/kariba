import json
import boto3

dynamodb = boto3.resource('dynamodb')

# Tabelas do DynamoDB
cards_table = dynamodb.Table('kariba-cards') # Tabela Cards
board_table = dynamodb.Table('kariba-board') # Tabela Board
match_table = dynamodb.Table('kariba-match') # Tabela Partida
score_table = dynamodb.Table('kariba-score') # Tabela Pontuação
user_table = dynamodb.Table('kariba-users')  # Tabela Usuário

def lambda_handler(event, context):
    print(event)
    # Parsing request do payload do frontend
    game_id = int(event['gameId'])  # 'gameId' tratado como número
    print(game_id)
 
    # Cartas iniciais - Registrando na tabela de cartas com IDs e quantidades como números
    initial_cards = [
        {'gameId': game_id, 'cardId': 1, 'quantity': 8},
        {'gameId': game_id, 'cardId': 2, 'quantity': 8},
        {'gameId': game_id, 'cardId': 3, 'quantity': 8},
        {'gameId': game_id, 'cardId': 4, 'quantity': 8},
        {'gameId': game_id, 'cardId': 5, 'quantity': 8},
        {'gameId': game_id, 'cardId': 6, 'quantity': 8},
        {'gameId': game_id, 'cardId': 7, 'quantity': 8},
        {'gameId': game_id, 'cardId': 8, 'quantity': 8}
    ]
    
    for card in initial_cards:
        cards_table.put_item(Item=card)
    
    # Inicializando o tabuleiro - Registrando na tabela de tabuleiro com IDs e quantidades como números
    initial_board = [
        {'gameId': game_id, 'position': 1, 'quantity': 0},
        {'gameId': game_id, 'position': 2, 'quantity': 0},
        {'gameId': game_id, 'position': 3, 'quantity': 0},
        {'gameId': game_id, 'position': 4, 'quantity': 0},
        {'gameId': game_id, 'position': 5, 'quantity': 0},
        {'gameId': game_id, 'position': 6, 'quantity': 0},
        {'gameId': game_id, 'position': 7, 'quantity': 0},
        {'gameId': game_id, 'position': 8, 'quantity': 0}
    ]
    
    for position in initial_board:
        board_table.put_item(Item=position)
    
    # Registrando na tabela de partida
    match_item = {
        'gameId': game_id,
        'round': 0,                    # Rodada (número)
        'gameState': 'waiting',        # Jogo aguardando início
        'player1State': 'waiting',     # Estado do jogador 1
        'player2State': 'waiting',     # Estado do jogador 2
        'player1conId': None,          # Conexão do jogador 1
        'player2conId': None,          # Conexão do jogador 2
        'winner': None                 # Vencedor ainda não definido
    }
    
    match_table.put_item(Item=match_item)
    
    # Registrando a pontuação inicial dos jogadores na tabela de score
    initial_scores = [
        {'gameId': game_id, 'connectionId': None, 'playerNumber': 1, 'collectedCards': 0},
        {'gameId': game_id, 'connectionId': None, 'playerNumber': 2, 'collectedCards': 0}
    ]
    
    for score in initial_scores:
        score_table.put_item(Item=score)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Jogo criado com sucesso')
    }
