import React, {Component} from 'react';
import { useOutletContext } from 'react-router-dom';

const Deck = (props) => 
{
  const backgroundCard = useOutletContext().backgroundCard;

  return(
    <div className="deck"
        onClick={props.onClick}
        style={{ visibility: props.visibilidade.status == true ? "visible" : "hidden"}}>
        <img src={`images/cards/${backgroundCard}/verso.png`}/>
        <div className="overlay">
          <span>Finalizar jogada</span>
        </div>
    </div>
  );
}

export default Deck;