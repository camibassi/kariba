import boto3
import json

def handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='sa-east-1',
                              aws_access_key_id='',
                              aws_secret_access_key='')
    
    tabela = dynamodb.Table('kariba-payments')
    
    param = event['queryStringParameters']

    response = tabela.scan(
        FilterExpression='paymentId = :paymentId and userId = :userId',
        ExpressionAttributeValues={
            ':paymentId': param['paymentId'],
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
