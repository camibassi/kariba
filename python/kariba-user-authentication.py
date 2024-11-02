import boto3
import json

def handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='sa-east-1',
                              aws_access_key_id='',
                              aws_secret_access_key='')
    
    tabela = dynamodb.Table('kariba-users')
    
    param = event['queryStringParameters']

    response = tabela.scan(
        FilterExpression='userName = :userName and userId = :userId',
        ExpressionAttributeValues={
            ':userName': param['userName'],
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

