import React, {Component} from 'react';
import Carta from './carta';
import useBoard from '../hooks/useBoard';
import { useState } from 'react';

const Pilha = (props) => {
    let cardClass = "carta " + "carta" + props.value;
    const board = useBoard();
    let value = props.value.id;

    // essa função recebe o valor da carta arrastada da mao, armazena o valor da pilha que recebeu 
    //a carta da mao e avalia se a pilha tem o mesmo numero da carta
    function dropTarget(e){
        // console.log("DROP", e.target.attributes["id"].value);
        e.target.style = "border: none;";
        
        // Obtem o nome da pilha que recebeu a carta
        let target = e.currentTarget;
        let imageDrop = target.attributes["id"].value;
        imageDrop = imageDrop.replace("pilha","");
      
        // Recebe as variaveis enviadas pelo evento DRAG da Mão
        const dataValor = e.dataTransfer.getData("cartaValor");
        const dataDiv = e.dataTransfer.getData("cartaDiv");

        if (dataValor === imageDrop || dataValor == "9" )
        {
          let div = document.getElementById(dataDiv);
          div.style.visibility = "hidden";
          
          board.mover(value, dataValor );
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
      //console.log("Dragenter", e.target);
      e.target.style = "border: 1px solid #ccc;";
    }

    function dragLeave(e)
    {
      //console.log("DragLeave", e.target);
      e.target.style = "border: none;";
    }

    return(
      <div id={props.id} class="pilha" onDrop={dropTarget} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave}>
        { board.board[value].map( i => <Carta value={i} /> ) }
      </div>
    );
}

export default Pilha;


/*<Carta armazena ===  
{hoveredImage === deck.path ? "1.png" : "verso.png"}*/

/*import React, {Component} from 'react';

const Pilha = (props) => {
        let cardClass = "carta " + "carta" + props.value;
        
      return(
        <div id={props.id} class="pilha">
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>
            <div class={cardClass}>
              <img src='images/cards/default/1.png'/>
            </div>

        </div>
      );
}

export default Pilha;*/