import React, {Component} from 'react';
import Carta from './carta';

const Pilha = (props) => {
        let cardClass = "carta " + "carta" + props.value;

  function dropTarget(e){
      console.log("DROP");
  }

  function dragOver(e)
  {
    console.log("Dragover", );
    e.stopPropagation();
    e.preventDefault();
  }

  function dragEnter(e)
  {
    console.log("Dragenter", e.target);
    e.target.style = "border: 1px solid #ccc;";
  }

  function dragLeave(e)
  {
    console.log("DragLeave", e.target);
    console.log()
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