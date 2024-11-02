import json
import boto3
import os
from decimal import Decimal
import random
import time

# Cria um cliente DynamoDB
dynamodb = boto3.client('dynamodb')
lambda_client = boto3.client('lambda')

def lambda_handler(event, context):
    print(event)
    # Obtém o connectionId da solicitação WebSocket
    connectionId = event['requestContext']['connectionId']

    # Armazena o connectionId na tabela DynamoDB
    dynamodb.put_item(
        TableName=os.environ['WEBSOCKET_TABLE'],
        Item={'connectionId': {'S': connectionId}}
    )
    
    # Prepara a resposta com o connectionId
    info = {
        "connectionId": connectionId,
        "mensagem": "Primeiro jogador conectado com sucesso"
    }
    
    response = dynamodb.scan(
        TableName=os.environ['WEBSOCKET_TABLE'],
        ProjectionExpression='connectionId'
    )
    
    # Extrai os connectionIds da resposta
    connection_ids = [item['connectionId']['S'] for item in response.get('Items', [])]

    print(info)
    print(connection_ids)

    print(len(connection_ids))
    
    if len(connection_ids) == 2:
        print('fazer chamada resto fluxo')
        # Prepara a resposta com os connectionIds
        info = {
            "connectionId": connectionId,
            "mensagem": "Segundo jogador conectado com sucesso"
        }
        game_id = generate_unique_numeric_code()
        print(game_id)
        print('***')
        lambda_invoke_start_game(game_id)
        lambda_invoke_start_match(game_id, connection_ids)
        lambda_invoke_deal_cards(game_id, connection_ids)
        lambda_invoke_get_game_state(game_id)

    
    elif len(connection_ids) > 2:
        # Remover o connectionId da tabela DynamoDB
        dynamodb.delete_item(
            TableName=os.environ['WEBSOCKET_TABLE'],
            Key={'connectionId': {'S': connectionId}}
        )
        
        # Prepara a resposta com o connectionId
        info = {
            "connectionId": connectionId,
            "mensagem": "Já existem 2 jogadores, conexão removida."
        }
        
        # Retorna a resposta com o status 405 (Método não permitido)
        return {
            'statusCode': 405,
            'body': json.dumps(info)
        }

    # Retorna a resposta com o status 201
    return {
        'statusCode': 201,
        'body': json.dumps(info)
    }
        
def generate_unique_numeric_code():
    # Obtém o timestamp atual em milissegundos
    timestamp = int(time.time() * 1000)
    # Gera um número aleatório grande
    random_number = random.randint(100000, 999999)
    # Combina o timestamp com o número aleatório
    unique_code = int(f"{timestamp}{random_number}")
    return unique_code

# Função para converter Decimal para int
def decimal_to_int(obj):
    if isinstance(obj, Decimal):
        return int(obj)
    raise TypeError("Type not serializable")

def lambda_invoke_start_game(game_id):
    api_gateway_url = os.environ['API_GATEWAY_URL']

    response = lambda_client.invoke(
        FunctionName='kariba-start-game',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id
        }, default=decimal_to_int)
    )

    print("Response from start game:", response)
    
def lambda_invoke_start_match(game_id, connection_ids):
    api_gateway_url = os.environ['API_GATEWAY_URL']

    response = lambda_client.invoke(
        FunctionName='kariba-start-match',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id,
            'players': connection_ids
        }, default=decimal_to_int)
    )

    print("Response from start match:", response)

def lambda_invoke_get_game_state(game_id):
    api_gateway_url = os.environ['API_GATEWAY_URL']

    response = lambda_client.invoke(
        FunctionName='kariba-get-game-state',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id
        }, default=decimal_to_int)
    )

    print("Response from get game state:", response)
    
def lambda_invoke_deal_cards(game_id, connection_ids):
    api_gateway_url = os.environ['API_GATEWAY_URL']

    response = lambda_client.invoke(
        FunctionName='kariba-deal-cards',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'gameId': game_id,
            'players': connection_ids
        }, default=decimal_to_int)
    )