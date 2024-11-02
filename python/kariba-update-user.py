import boto3
import json
import logging

# Configuração do logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Iniciando a função Lambda de atualização de usuário")
    
    # Inicializa o recurso DynamoDB
    dynamodb = boto3.resource('dynamodb', region_name='sa-east-1')
    tabela = dynamodb.Table('kariba-users')

    logger.info(f"Parâmetros recebidos para atualização: {event}")

    # Obtém o username do evento
    try:
        username = event['username']
        update_fields = event
        update_fields.pop('username', None)
    except KeyError as e:
        logger.error(f"Erro ao processar o corpo da solicitação: {e}")
        return {
            'statusCode': 400,
            'body': json.dumps({
                'error': 'Erro ao processar o corpo da solicitação: parâmetro ausente',
                'details': str(e)
            })
        }

    if not update_fields:
        return {
            'statusCode': 400,
            'body': json.dumps({
                'error': 'Nenhum campo para atualização fornecido'
            })
        }

    logger.info(f"Verificando se o usuário {username} existe.")

    # Verifica se o usuário existe
    try:
        response = tabela.get_item(Key={'username': username})

        if 'Item' not in response:
            logger.info("Usuário não encontrado.")
            return {
                'statusCode': 404,
                'body': json.dumps({
                    'error': 'Usuário não encontrado'
                })
            }
        else:
            logger.info("Usuário encontrado. Prosseguindo com a atualização.")
    except Exception as e:
        logger.error(f"Erro ao verificar a existência do usuário: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Erro ao verificar a existência do usuário',
                'details': str(e)
            })
        }

    # Prepara a atualização dos campos fornecidos
    update_expression = "SET "
    expression_attribute_values = {}
    for key, value in update_fields.items():
        update_expression += f"{key} = :{key}, "
        expression_attribute_values[f":{key}"] = value
    update_expression = update_expression.rstrip(", ")

    # Atualiza o usuário no DynamoDB
    try:
        tabela.update_item(
            Key={'username': username},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values
        )
        logger.info("Usuário atualizado com sucesso.")
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Usuário atualizado com sucesso'
            })
        }
    except Exception as e:
        logger.error(f"Erro ao atualizar o usuário: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Erro ao atualizar usuário',
                'details': str(e)
            })
        }
