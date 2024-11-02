import React, {Component} from 'react';
import Carta from './Carta';
import useRequest from '../hooks/useRequest';
import { useOutletContext } from 'react-router-dom';

const Pilha = (props) => {
    const webSocket = useOutletContext().webSocket;
    const board = props.board;
    let value = props.value.id;
    const {sendRequest} = useRequest({});

    function dropTarget(e)
    {
        e.target.style = "border: none;";
        
        let target = e.currentTarget;
        let imageDrop = target.attributes["id"].value;
        imageDrop = imageDrop.replace("pilha","");
      
        const dataValor = e.dataTransfer.getData("cartaValor");
        if (dataValor === imageDrop || dataValor == "9" )
        {

          const board = webSocket.gameState.board;
          const existe = board.positions.filter(x => x.position == dataValor);
          if(existe)
            board.positions.forEach(x => {
              if(x.position == dataValor)
                x.quantity = x.quantity + 1;
            })
          else
            board.positions.push({
              position: dataValor,
              quantity: 1
            })

          const deck = webSocket.gameState.deck;
          const meuDeck = deck.players.find(x => x.connectionId == webSocket.connectionId)?.deck;
          meuDeck.forEach(item => {
            if(item.cardId == dataValor)
              item.quantity = item.quantity - 1;
          })
debugger;
          const match = webSocket.gameState.match;
          const isPlayer1 = match.player1conId === webSocket.connectionId;
          const isPlayer2 = match.player2conId === webSocket.connectionId;
          
          if(isPlayer1)
          {
            match.player1State = 'waiting';
            match.player2State = 'playing';
          }
          else
          {
            match.player2State = 'waiting';
            match.player1State = 'playing';
          }

          webSocket.setGameState({
            ...webSocket.gameState,
            ...{board: board, deck: deck, match: match}
          })
          sendRequest({
            url: 'makeMove',
            method: 'POST',
            body: {
              player: props.connectionId,
              quantity: 1,
              position: value,
              gameId: props.gameId
            }
          })
        }
    }

    function dragOver(e)
    {
      console.log("Dragover", );
      e.stopPropagation();
      e.preventDefault();
    }

    function dragEnter(e)
    {
      e.target.style = "border: 1px solid #ccc;";
    }

    function dragLeave(e)
    {
      e.target.style = "border: none;";
    }

    return(
      <div id={props.id} class="pilha" onDrop={dropTarget} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave}>
        {board.filter(x => x.position == value).map(card => {

          let retorno = [];
          for(let i = 0; i < card.quantity; i++)
            retorno.push(<Carta value={card.position} />);

          return retorno;
        } ) }
      </div>
    );
}

export default Pilha;