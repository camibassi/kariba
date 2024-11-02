import json
import boto3
import os
from decimal import Decimal
import random
import time

# Conectar ao DynamoDB
lambda_client = boto3.client('lambda')

def lambda_handler(event, context):
    game_id = int(event['gameId'])
    player = event['player']      # O connectionId do jogador

    # Monta a mensagem do lambda
    message = {
        "connectionId" : None,
        "action": "elefante",
    }

    # Busca todas as conexões abertas
    tabela_conexoes = os.environ['WEBSOCKET_TABLE'];
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
