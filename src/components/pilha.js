import React, {Component} from 'react';
import Carta from './carta';
import useBoard from '../hooks/useBoard';
import { useState } from 'react';

const Pilha = (props) => {
    let cardClass = "carta " + "carta" + props.value;
    const board = props.board;
    let value = props.value.id;
    
    function dropTarget(e)
    {
        e.target.style = "border: none;";
        
        let target = e.currentTarget;
        let imageDrop = target.attributes["id"].value;
        imageDrop = imageDrop.replace("pilha","");
      
        const dataValor = e.dataTransfer.getData("cartaValor");

        if (dataValor === imageDrop || dataValor == "9" )
        {
          let x = board.mover(value, dataValor );
          if( x == true ) 
            props.cartas.removerCarta(dataValor);  
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
        { board.board[value].map( i => <Carta value={i} /> ) }
      </div>
    );
}

export default Pilha;