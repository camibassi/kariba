import json
import boto3
import os
from decimal import Decimal

# Função para converter Decimal para int
def decimal_to_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    raise TypeError("Type not serializable")

# Inicialização do cliente DynamoDB e do cliente Lambda
dynamodb = boto3.resource('dynamodb')
lambda_client = boto3.client('lambda')

# Referência às tabelas
cards_table = dynamodb.Table('kariba-cards')
deck_table = dynamodb.Table('kariba-deck')
board_table = dynamodb.Table('kariba-board')
match_table = dynamodb.Table('kariba-match')
score_table = dynamodb.Table('kariba-score')

def lambda_handler(event, context):
    game_id = int(event['gameId']) 
    
    print(f"Game ID: {game_id}")
    
    response = dynamodb.Table(os.environ['WEBSOCKET_TABLE']).scan(
        ProjectionExpression='connectionId'
    )
    
    print("Response:", response)
    
    connection_ids = [item['connectionId'] for item in response.get('Items', [])]

    cards_response = cards_table.query(
        KeyConditionExpression=boto3.dynamodb.conditions.Key('gameId').eq(game_id)
    )
    cards = cards_response['Items']
    
    print("Cards:", cards)

    # Busca os decks para cada connectionId
    decks = []
    for connection_id in connection_ids:  
        deck_response = deck_table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('connectionId').eq(connection_id)
        )
        deck = deck_response['Items']
        
        # Adiciona os decks à lista, se existirem
        if deck:
            decks.append({
                "connectionId": connection_id,
                "deck": [
                    {
                        "cardId": card['cardId'],
                        "quantity": card['quantity']
                    } for card in deck
                ]
            })

    print("Decks:", decks)

    board_response = board_table.query(
        KeyConditionExpression=boto3.dynamodb.conditions.Key('gameId').eq(game_id)
    )
    board = board_response['Items']
    
    print("Board:", board)

    match_response = match_table.get_item(
        Key={'gameId': game_id}
    )
    match = match_response.get('Item', {})
    
    print("Match:", match)

    score_response = score_table.query(
        KeyConditionExpression=boto3.dynamodb.conditions.Key('gameId').eq(game_id) 
    )
    scores = score_response['Items']
    
    print("Scores:", scores)
    
    message = {
        "connectionId" : None,
        "action": "gameState",
        "gameState": {
            "cards": {
                "gameId": game_id,
                "cards": [{"cardId": decimal_to_int(card['cardId']), "quantity": decimal_to_int(card['quantity'])} for card in cards]
            },
            "deck": {
                "gameId": game_id,
                "players": [
                    {
                        "connectionId": deck_item['connectionId'],
                        "deck": [{"cardId": decimal_to_int(card['cardId']), "quantity": decimal_to_int(card['quantity'])} for card in deck_item['deck']]
                    }
                    for deck_item in decks
                ]
            },
            "board": {
                "gameId": game_id,
                "positions": [{"position": decimal_to_int(position['position']), "quantity": decimal_to_int(position['quantity'])} for position in board]
            },
            "match": {
                "gameId": game_id,
                "round": match.get('round'),
                "gameState": match.get('gameState'),
                "player1State": match.get('player1State'),
                "player2State": match.get('player2State'),
                "player1conId": match.get('player1conId'),
                "player2conId": match.get('player2conId'),
                "winner": match.get('winner')
            },
            "score": {
                "gameId": game_id,
                "players": [
                    {
                        "connectionId": score['connectionId'],
                        "playerNumber": decimal_to_int(score['playerNumber']),
                        "collectedCards": decimal_to_int(score['collectedCards'])
                    }
                    for score in scores
                ]
            }
        }
    }

    print(message)

    for connection_id in connection_ids:
        print(connection_id)
        message['connectionId'] = connection_id;
        send_message_to_websocket(connection_id, message)

    return {
        'statusCode': 200,
        'body': json.dumps("Sucesso ao consultar estado atual do jogo"),
    }

def send_message_to_websocket(connection_id, message):
    api_gateway_url = os.environ['API_GATEWAY_URL']

    response = lambda_client.invoke(
        FunctionName='kariba-send',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'connectionId': connection_id,
            'message': message
        }, default=decimal_to_int)
    )

    print("Response from sending message:", response)
