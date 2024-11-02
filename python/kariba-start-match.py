import json
import boto3

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')

# Tabelas do DynamoDB
match_table = dynamodb.Table('kariba-match')  # Tabela Partida
score_table = dynamodb.Table('kariba-score')  # Tabela Pontuação

def lambda_handler(event, context):
    game_id = event['gameId']
    players = event['players']
    print(event)
    
    try:
        # Atualizar os dados de pontuação
        for i, player in enumerate(players, start=1):
            score_table.update_item(
                Key={
                    'gameId': game_id,
                    'playerNumber': i
                },
                UpdateExpression="""
                    SET collectedCards = :collectedCards,
                        connectionId = :connectionId
                """,
                ExpressionAttributeValues={
                    ':collectedCards': 0,
                    ':connectionId': player
                },
                ReturnValues="UPDATED_NEW"
            )
        
        # Atualizar os dados da partida
        match_table.update_item(
            Key={'gameId': game_id},
            UpdateExpression="""
                SET round = :round,
                    gameState = :gameState,
                    player1State = :player1State,
                    player2State = :player2State,
                    player1conId = :player1conId,
                    player2conId = :player2conId,
                    winner = :winner
            """,
            ExpressionAttributeValues={
                ':round': 1,
                ':gameState': 'in progress',
                ':player1State': 'playing',
                ':player2State': 'waiting',
                ':player1conId': players[0],
                ':player2conId': players[1],
                ':winner': None
            },
            ReturnValues="UPDATED_NEW"
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps('Sucesso ao iniciar a partida')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Erro ao iniciar a partida: {str(e)}')
        }
