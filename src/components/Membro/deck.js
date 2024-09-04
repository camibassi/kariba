import React, {Component} from 'react';
import Mao from './mao';

const Deck = (props) => 
{
  function click()
  {
    // alert(Mao.setCartas([1, 2, 3, 4, 5]));
  }
  return(
    <div id="deck" onClick={click}>
        <img src="images/cards/default/verso.png"/>
    </div>
  );
}

export default Deck;