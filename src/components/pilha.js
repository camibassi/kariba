import React, {Component} from 'react';
import Carta from './carta';

const Pilha = (props) => {
        let cardClass = "carta " + "carta" + props.value;

  // essa função recebe o valor da carta arrastada da mao, armazena o valor da pilha que recebeu 
  //a carta da mao e avalia se a pilha tem o mesmo numero da carta
  function dropTarget(e){
 //     console.log("DROP", e.target.attributes["id"].value);
      e.target.style = "border: none;";
      let imageDrop = e.target.attributes["id"].value;
      imageDrop = imageDrop.replace("pilha","");
      const dataDrag = e.dataTransfer.getData("cartaDrag");
      console.log(dataDrag);
      console.log(imageDrop);
      if (dataDrag === imageDrop){
          alert("ok"); //ação do backend? as cartas são retiradas a cada joagada ou ao final da partida?     
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