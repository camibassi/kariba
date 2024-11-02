import json
import boto3
import os

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    print(event)
    
    # Obtém o connectionId e a mensagem do evento
    connectionId = event['connectionId']
    message = event['message']  # Assume que 'message' é um dicionário

    apigatewaymanagementapi = boto3.client(
        'apigatewaymanagementapi', 
        endpoint_url="https://1na5t5v281.execute-api.sa-east-1.amazonaws.com/production"
    )

    # Converte a mensagem para JSON e depois para bytes
    data_to_send = json.dumps(message).encode('utf-8')  # Converte para bytes

    # Envia a mensagem apenas para o connectionId específico
    try:
        apigatewaymanagementapi.post_to_connection(
            Data=data_to_send,
            ConnectionId=connectionId
        )
        print(f"Mensagem enviada para {connectionId}")
    except Exception as e:
        print(f"Falha ao enviar mensagem para {connectionId}: {e}")

    return {
        'statusCode': 200,
        'body': json.dumps('Mensagem enviada com sucesso')
    }
