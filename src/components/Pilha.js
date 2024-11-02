import React, {Component, useRef} from 'react';
import Carta from './Carta';
import useRequest from '../hooks/useRequest';
import { useOutletContext } from 'react-router-dom';
import { Toast } from 'primereact/toast';

const Pilha = (props) => {
    const webSocket = useOutletContext().webSocket;
    const board = props.board;
    let value = props.value.id;
    
    function dropTarget(e)
    {
        e.target.style = "border: none;";
        
        let target = e.currentTarget;
        let imageDrop = target.attributes["id"].value;
        imageDrop = imageDrop.replace("pilha","");
      
        const dataValor = e.dataTransfer.getData("cartaValor");

        if(props.cartaMovimentada && props.cartaMovimentada != dataValor)
          return props.setMensagemErroMovimentacao(`Carta não permitida nessa rodada. Você movimentou a ${props.cartaMovimentada}, então só pode jogar com ela.`);

        if (dataValor === imageDrop || dataValor == "9")
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
          });

          webSocket.setGameState({
            ...webSocket.gameState,
            ...{board: board, deck: deck}
          });
          
          props.guardarCartas(dataValor);
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
      console.log('dragleave');
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