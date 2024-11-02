import json
import boto3
import random

# Inicializando o cliente do DynamoDB
dynamodb = boto3.resource('dynamodb')
cards_table = dynamodb.Table('kariba-cards')
deck_table = dynamodb.Table('kariba-deck')

def lambda_handler(event, context):
    # Extraindo gameId e connectionIds dos jogadores do evento
    game_id = event.get('gameId')
    players = event.get('players', [])
    print(game_id)
    print(players)
    
    if len(players) != 2:
        return {
            'statusCode': 400,
            'body': json.dumps('Deve haver exatamente dois jogadores.')
        }

    # Lista para armazenar as cartas que serão distribuídas
    player_decks = {players[0]: {}, players[1]: {}}
    print(f'player_decks: {player_decks}') 
    
    available_cards = {i: 0 for i in range(1, 9)}  # Dicionário para contar cartas disponíveis
    print(f'available_cards: {available_cards}')
    
    # Verificando a quantidade de cada carta disponível
    for card_id in range(1, 9):
        response = cards_table.get_item(
            Key={
                'gameId': game_id,
                'cardId': card_id
            }
        )
        card_item = response.get('Item')
        if card_item:
            available_cards[card_id] = card_item['quantity']

    # Distribuindo as cartas aleatoriamente
    for _ in range(5):  # Cada jogador recebe 5 cartas
        for player in players:
            # Escolher uma carta aleatória que esteja disponível
            card_id = None
            while card_id is None:
                temp_card_id = random.randint(1, 8)  # ID da carta entre 1 e 8
                if available_cards[temp_card_id] > 0:
                    card_id = temp_card_id

            # Atualiza o deck do jogador
            if card_id in player_decks[player]:
                player_decks[player][card_id] += 1
            else:
                player_decks[player][card_id] = 1

            # Atualiza a quantidade disponível localmente
            available_cards[card_id] -= 1

            # Atualizando a quantidade de cartas na tabela
            cards_table.update_item(
                Key={
                    'gameId': game_id,
                    'cardId': card_id
                },
                UpdateExpression='SET quantity = quantity - :val',
                ExpressionAttributeValues={
                    ':val': 1
                }
            )

    # Adicionando os decks dos jogadores na tabela de deck
    for connection_id, cards in player_decks.items():
        for card_id, quantity in cards.items():
            deck_table.put_item(
                Item={
                    'gameId': game_id,
                    'cardId': card_id,
                    'connectionId': connection_id,
                    'quantity': quantity  # A quantidade real atribuída ao jogador
                }
            )

    return {
        'statusCode': 200,
        'body': json.dumps('Deck criado com sucesso')
    }
