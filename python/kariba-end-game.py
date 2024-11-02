import json
import boto3

# Inicializa o recurso DynamoDB
dynamodb = boto3.resource('dynamodb')

# Tabela de partidas
match_table = dynamodb.Table('kariba-match')

def lambda_handler(event, context):
    try:
        # Pegar gameId e connectionId do payload recebido
        game_id = int(event['gameId'])
        winner_connection_id = event['player']['connectionId']

        # Atualizando os dados da partida
        response = match_table.update_item(
            Key={'gameId': game_id},
            UpdateExpression="""
                SET gameState = :gameState,
                    player1State = :player1State,
                    player2State = :player2State,
                    winner = :winner
            """,
            ExpressionAttributeValues={
                ':gameState': 'finished',
                ':player1State': 'stopped',
                ':player2State': 'stopped',
                ':winner': winner_connection_id
            },
            ReturnValues="UPDATED_NEW"
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Fim de partida')
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Ocorreu um erro ao tentar encerrar a partida: {str(e)}')
        }

