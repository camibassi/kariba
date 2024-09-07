import React, {Component} from 'react';
import Mao from './mao';

const Deck = (props) => 
{
  return(
    <div id="deck" onClick={props.cartas.adicionarCarta}>
        <img src="images/cards/default/verso.png"/>
    </div>
  );
}

export default Deck;