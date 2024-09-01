import React, {Component} from 'react';

const Pilha = (props) => {
        let cardClass = "carta " + "carta" + props.value;
        
      return(
        <div id={props.id} class="pilha">
            <div class={cardClass}>
              <img src={props.img}/>
            </div>
        </div>
      );
}

export default Pilha;