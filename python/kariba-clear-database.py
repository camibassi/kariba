import json
import boto3

# Inicializando o cliente do DynamoDB
dynamodb = boto3.resource('dynamodb')

# Definindo as tabelas que serão limpas com suas respectivas chaves
tables_to_clear = {
    'kariba-board': ['gameId', 'position'],
    'kariba-cards': ['gameId', 'cardId'],
    'kariba-deck': ['connectionId', 'cardId'],
    'kariba-match': ['gameId'],
    'kariba-score': ['gameId', 'playerNumber'],
    'kariba-websocket-connections': ['connectionId']
}

def delete_all_items_from_table(table_name, keys):
    table = dynamodb.Table(table_name)
    
    # Scan para obter todas as entradas
    response = table.scan()
    items = response.get('Items', [])
    
    # Deletando cada item individualmente
    for item in items:
        # Construindo a chave primária corretamente com base nas chaves fornecidas
        key = {k: item[k] for k in keys if k in item}
        table.delete_item(Key=key)

def lambda_handler(event, context):
    try:
        # Limpar cada tabela
        for table_name, keys in tables_to_clear.items():
            delete_all_items_from_table(table_name, keys)
        
        return {
            'statusCode': 200,
            'body': json.dumps('Todas as tabelas foram limpas com sucesso.')
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Ocorreu um erro: {str(e)}')
        }
