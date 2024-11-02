import json
import boto3
import os
from decimal import Decimal
import random
import time

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')
lambda_client = boto3.client('lambda')

WEBSOCKET_TABLE = os.environ['WEBSOCKET_TABLE'];
API_GATEWAY_URL = os.environ['API_GATEWAY_URL'];

def lambda_handler(event, context):
    global WEBSOCKET_TABLE;
    game_id = int(event['gameId'])
    player = event['player']      # O connectionId do jogador

    # Monta a mensagem do lambda
    message = {
        "connectionId" : None,
        "action": "elefante",
    }

    # Busca todas as conexões abertas
    tabela_conexoes = WEBSOCKET_TABLE;
    response = dynamodb.Table(tabela_conexoes).scan(
        ProjectionExpression='connectionId'
    )
    connection_ids = [item['connectionId'] for item in response.get('Items', [])]

    # Envia para todas conexões exceto do proprio jogador que enviou
    for connection_id in connection_ids:
        if( connection_id != player ):
            message['connectionId'] = connection_id;
            send_message_to_websocket(connection_id, message)

    return {
        'statusCode': 200,
        'body': "Lambda OK"
    }



def send_message_to_websocket(connection_id, message):
    global API_GATEWAY_URL
    api_gateway_url = API_GATEWAY_URL;

    response = lambda_client.invoke(
        FunctionName='kariba-send',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'connectionId': connection_id,
            'message': message
        }, default=decimal_to_int)
    )

    print("Response from sending message:", response)
