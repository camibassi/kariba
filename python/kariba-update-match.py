import json
import boto3

# Conectar ao DynamoDB
dynamodb = boto3.resource('dynamodb')
match_table = dynamodb.Table('kariba-match')

def lambda_handler(event, context):
    print(event)
    game_id = event['gameId']
    
    # Obter dados atuais da partida
    response = match_table.get_item(
        Key={'gameId': game_id}
    )
    print(response)
    if 'Item' not in response:
        return {
            'statusCode': 400,
            'body': json.dumps('Partida não encontrada')
        }
    
    match = response['Item']
    round_number = match['round']
    player1State = match['player1State']
    player2State = match['player2State']
    print(match)
    
    # Atualizar estados dos jogadores e a rodada
    if player1State == 'playing':
        match['player1State'] = 'waiting'
        match['player2State'] = 'playing'
        
    elif player2State == 'playing':
        match['player1State'] = 'playing'
        match['player2State'] = 'waiting'
    
    round_number += 1  # Incrementar rodada após jogada do player2
    match['round'] = round_number
    
    print(match)
    # Atualizar valores na tabela
    match_table.update_item(
        Key={'gameId': game_id},
        UpdateExpression="SET round = :round, player1State = :p1_state, player2State = :p2_state",
        ExpressionAttributeValues={
            ':round': round_number,
            ':p1_state': match['player1State'],
            ':p2_state': match['player2State'],

        }
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Sucesso ao atualizar a partida')
    }
