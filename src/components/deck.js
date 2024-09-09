import React, {Component} from 'react';
import Mao from './mao';

const Deck = (props) => 
{
  let visible = props.visibilidade.status;
  return(
    <div className="deck" onClick={props.cartas.adicionarCarta} 
        style={{ visibility: visible == true ? "visible" : "hidden"}}>
        <img src="images/cards/default/verso.png"/>
    </div>
  );
}

export default Deck;