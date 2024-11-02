import boto3
import json
import os
from botocore.exceptions import ClientError
from decimal import Decimal

# Inicializa o recurso DynamoDB
dynamodb = boto3.resource('dynamodb')

# Tabela de Partidas
match_table = dynamodb.Table('kariba-match')

# Variável de ambiente que contém o endpoint da API WebSocket
# Preciso de ajuda com essa URL. Deveria ser algo do tipo "https://{api-id}.execute-api.sa-east-1.amazonaws.com/{stage}"

WEBSOCKET_API_URL = os.environ['WEBSOCKET_API_URL'] 

def send_to_websocket(message, connection_ids):
    # Inicializar o cliente API Gateway Management API
    apigw_client = boto3.client(
        'apigatewaymanagementapi',
        endpoint_url=WEBSOCKET_API_URL
    )

    for connection_id in connection_ids:
        try:
            # Enviando a mensagem ao WebSocket usando o connectionId
            apigw_client.post_to_connection(
                ConnectionId=connection_id,
                Data=message
            )
            print(f"Mensagem enviada para connectionId {connection_id}")
        
        except Exception as e:
            print(f"Erro ao enviar mensagem para connectionId {connection_id}: {str(e)}")

def lambda_handler(event, context):
    try:
        # Verifica se 'pathParameters' e 'gameId' estão presentes
        if 'pathParameters' not in event or 'gameId' not in event['pathParameters']:
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'gameId não fornecido.'
                })
            }

        # Extraindo o gameId da URL
        game_id = int(event['pathParameters']['gameId'])

        # Consultando a tabela da partida
        response = match_table.get_item(Key={'gameId': game_id})

        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({
                    'error': 'Partida não encontrada.'
                })
            }

        match_data = decimal_to_native(response['Item'])

        # Mensagem a ser enviada ao websocket
        data = json.dumps({
            'action': 'getMatch',
            'match': match_data
        })

        # Enviar mensagem ao WebSocket para cada jogador
        send_to_websocket(data, [match_data['player1conId'], match_data['player2conId']])

        return {
            'statusCode': 200,
            'body': json.dumps('Partida encontrada')
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Ocorreu um erro ao consultar a partida: {str(e)}')
        }

# Função para converter Decimal para tipos JSON nativos
def decimal_to_native(obj):
    if isinstance(obj, list):
        return [decimal_to_native(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: decimal_to_native(v) for k, v in obj.items()}
    elif isinstance(obj, Decimal):
        # Convertendo Decimal para int se for um número inteiro ou float se for decimal
        return int(obj) if obj % 1 == 0 else float(obj)
    else:
        return obj