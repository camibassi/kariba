import boto3
import json

def handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='sa-east-1',
                              aws_access_key_id='',
                              aws_secret_access_key='') #Login de acesso
    
    tabela = dynamodb.Table('kariba-match')
    
    param = event['queryStringParameters']

    response = tabela.scan(
        FilterExpression='matchId = :matchId and userId = :userId', #Nesta linha são filtrados esses items para serem utilizados como parametro
        ExpressionAttributeValues={
            ':matchId': param['matchId'],
            ':userId': param['userId']
        }
    )

    dados = response['Items']

    result = {
        'statusCode': 200,
        'body': json.dumps(dados)
    }
    
    if not dados:
        result['statusCode'] = 204
    
    return result
