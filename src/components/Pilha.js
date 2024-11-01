import React, {Component} from 'react';
import Carta from './AvisoPosicaoCarta';
import useRequest from '../hooks/useRequest';

const Pilha = (props) => {
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
        {board.map(card => {

          let retorno = [];
          for(let i = 0; i < card.quantity; i++)
            retorno.push(<Carta value={card.position} />);

          return retorno;
        } ) }
      </div>
    );
}

export default Pilha;