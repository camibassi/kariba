import boto3
import json
import logging
from decimal import Decimal

# Configuração do logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Função para converter Decimal para float ou int
def convert_decimal(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    elif isinstance(obj, list):
        return [convert_decimal(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: convert_decimal(value) for key, value in obj.items()}
    return obj

def lambda_handler(event, context):
    logger.info("Iniciando a função Lambda")
    logger.info(f"Evento recebido: {json.dumps(event)}")
    
    # Inicializa o recurso DynamoDB
    dynamodb = boto3.resource('dynamodb', region_name='sa-east-1')
    tabela = dynamodb.Table('kariba-users')

    # Obtém os parâmetros da query string
    try:
        query_params = event
        
        if not query_params or 'username' not in query_params or 'password' not in query_params:
            raise ValueError("username ou password não podem ser nulos.")
        
        username = query_params['username']
        password = query_params['password']
    except Exception as e:
        logger.error(f"Erro ao processar os parâmetros da solicitação: {e}")
        return {
            'statusCode': 400,
            'body': json.dumps({
                'error': 'Erro ao processar os parâmetros da solicitação: parâmetro ausente',
                'details': str(e)
            })
        }

    logger.info(f"Verificando se o usuário {username} existe.")

    # Verifica se o usuário já existe
    try:
        response = tabela.get_item(Key={'username': username})

        if 'Item' in response:
            # Validar se a senha corresponde
            if response['Item']['password'] == password:
                logger.info("Usuário encontrado e senha válida.")
                return {
                    'statusCode': 200,
                    'body': json.dumps({
                        'message': 'Usuário encontrado e autenticado com sucesso.',
                        'details': convert_decimal(response['Item'])  # Converte valores Decimal para JSON serializável
                    })
                }
            else:
                logger.info("Usuário encontrado, mas a senha está incorreta.")
                return {
                    'statusCode': 400,
                    'body': json.dumps({
                        'error': 'Login ou senha estão incorretos.',
                        'errors': [{'field': 'password', 'message': 'Senha incorreta'}],
                        'details': 'A senha informada está incorreta para o nome de usuário fornecido.'
                    })
                }
        else:
            logger.info("Usuário não encontrado.")
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'Login ou senha estão incorretos.',
                    'errors': [{'field': 'username', 'message': 'Nome de usuário não encontrado'}],
                    'details': 'O nome de usuário informado não está registrado no banco de dados.'
                })
            }
    except Exception as e:
        logger.error(f"Erro ao verificar a existência do usuário: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Erro ao verificar a existência do usuário',
                'details': str(e)
            })
        }
