import json
import boto3
import os
from decimal import Decimal
import random
import time

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')
lambda_client = boto3.client('lambda')

# Tabelas do DynamoDB
board_table = dynamodb.Table('kariba-board')  # Tabela Tabuleiro
deck_table = dynamodb.Table('kariba-deck')    # Tabela Deck

def lambda_handler(event, context):
    # Extrair os dados do payload recebido
    game_id = int(event['gameId'])
    position = event['position']  # A posição no tabuleiro onde a carta será jogada
    quantity = event['quantity']  # A quantidade de cartas a serem jogadas
    player = event['player']      # O connectionId do jogador
    print(event)
    try:
        # Atualizar o tabuleiro na tabela kariba-board
        board_table.update_item(
            Key={
                'gameId': game_id,
                'position': position
            },
            UpdateExpression="ADD quantity :val",  # Adiciona as cartas jogadas na posição
            ExpressionAttributeValues={
                ':val': quantity
            },
            ReturnValues="UPDATED_NEW"
        )
        print(f"passou do tabuleiro")
        # Verificar se o jogador tem cartas suficientes no deck
        response = deck_table.get_item(
            Key={
                'connectionId': player,  # Partition Key: connectionId (player)
                'cardId': position        # Sort Key: cardId (posição/carta jogada)
            }
        )

        if 'Item' not in response:
            return {
                'statusCode': 400,
                'body': json.dumps('Jogador não possui essa carta no deck.')
            }
        
        player_deck = response['Item']
        player_quantity = player_deck.get('quantity', 0)
        print(player_deck)
        print(player_quantity)
        # Verificar se o jogador tem cartas suficientes para realizar a jogada
        if player_quantity < quantity:
            return {
                'statusCode': 400,
                'body': json.dumps(f'Jogador não tem cartas suficientes. Tem {player_quantity}, mas tentou jogar {quantity}.')
            }

        # Decrementar as cartas jogadas da tabela kariba-deck para o jogador específico
        deck_table.update_item(
            Key={
                'connectionId': player,  # Partition Key: connectionId
                'cardId': position        # Sort Key: cardId
            },
            UpdateExpression="SET quantity = quantity - :val",
            ExpressionAttributeValues={
                ':val': quantity
            },
            ConditionExpression="quantity >= :val",  # Garantir que o jogador tenha cartas suficientes
            ReturnValues="UPDATED_NEW"
        )
        lambda_invoke_pick_card(game_id, player)
        #lambda_invoke_collect_card(game_id, player)
        lambda_invoke_update_match(game_id)
        lambda_invoke_get_game_state(game_id)

        return {
            'statusCode': 200,
            'body': json.dumps('Jogada realizada com sucesso')
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Erro ao realizar a jogada: {str(e)}')
        }

# Função para converter Decimal para int
def decimal_to_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    raise TypeError("Type not serializable")

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
            'player': connection_id
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
    
def lambda_invoke_collect_card(game_id, connection_id):
    response = lambda_client.invoke(
        FunctionName='kariba-collect-card',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id,
            'player': connection_id
        }, default=decimal_to_int)
    )

    print("Response from collect card:", response)