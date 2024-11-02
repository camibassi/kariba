import json
import boto3
import os

# Inicializando o cliente do DynamoDB e do API Gateway WebSocket
dynamodb = boto3.resource('dynamodb')
apigatewaymanagementapi = boto3.client('apigatewaymanagementapi', region_name='sa-east-1')

# Tabela do DynamoDB
connections_table = dynamodb.Table('kariba-websocket-connections')

def lambda_handler(event, context):
    try:
        # Consultar a tabela de conexões para obter todos os connectionId
        response = connections_table.scan()
        connections_ids = {item['connectionId'] for item in response.get('Items', [])}

        # Enviar mensagem via WebSocket para os connectionIds
        if connections_ids:
            send_message_to_websocket(connections_ids)

        return {
            'statusCode': 200,
            'body': json.dumps(f'Consulta de conexões realizada com sucesso: {str(connections_ids)}')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Ocorreu um erro: {str(e)}')
        }

def send_message_to_websocket(connections_ids):
    data = json.dumps({
        'action': 'getPlayers',
        'players': [{'connectionId': connId} for connId in connections_ids]
    })

    # Enviar a mensagem para cada connectionId
    for connection_id in connections_ids:
        try:
            apigatewaymanagementapi.post_to_connection(
                ConnectionId=connection_id,
                Data=data
            )
        except Exception as e:
            print(f'Erro ao enviar mensagem para {connection_id}: {str(e)}')