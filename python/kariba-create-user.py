import boto3
import json
import logging

# Configuração do logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Iniciando a função Lambda")
    
    # Inicializa o recurso DynamoDB
    dynamodb = boto3.resource('dynamodb', region_name='sa-east-1')
    tabela = dynamodb.Table('kariba-users')

    logger.info(f"Parâmetros recebidos: {event}")

    # Obtém o username e password do evento
    try:
        username = event['username'];
        password = event['password'];
        email    = event['email'];
    except KeyError as e:
        logger.error(f"Erro ao processar o corpo da solicitação: {e}")
        return {
            'statusCode': 400,
            'body': json.dumps({
                'error': 'Erro ao processar o corpo da solicitação: parâmetro ausente',
                'details': str(e)
            })
        }

    logger.info(f"Verificando se o usuário {username} já existe.")

    # Verifica se o usuário já existe
    try:
        response = tabela.get_item(Key={'username': username})

        if 'Item' in response:
            logger.info("Usuário já existe.")
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'error': 'Usuário já existe',
                    'errors': [{'field': 'username', 'message': 'Nome de usuário já cadastrado'}],
                    'details': 'O nome de usuário informado já está registrado no banco de dados.'
                })
            }
        else:
            logger.info("Usuário não encontrado. Prosseguindo com a inserção.")
    except Exception as e:
        logger.error(f"Erro ao verificar a existência do usuário: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Erro ao verificar a existência do usuário',
                'details': str(e)
            })
        }

    logger.info("Inserindo item no DynamoDB")

    # Insere o novo usuário no DynamoDB
    try:
        response = tabela.put_item(
            Item={
                'username': username,
                'password': password,
                'nome': '',
                'email': email,
                'pais': '',
                'dataNascimento': '',
                'vitorias': 0,
                'saldo': 0,
                'derrotas': 0,
                'permissoes': {
                    "deck": ['default'],
                    "background": ['natureza'],
                    "music": ['default'],
                    "extraCard": False
                }   
            }
        )
        logger.info("Item inserido com sucesso.")
        return {
            'statusCode': 201,  # Código 201 para criação bem-sucedida
            'body': json.dumps({
                'message': 'Usuário criado com sucesso'
            })
        }
    except Exception as e:
        logger.error(f"Erro ao inserir item: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Erro ao criar usuário',
                'details': str(e)
            })
        }
