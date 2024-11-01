import React, {Component} from 'react';
import { useOutletContext } from 'react-router-dom';

const Deck = (props) => 
{
  const backgroundCard = useOutletContext().backgroundCard;

  return(
    <div className="deck" 
        style={{ visibility: props.visibilidade.status == true ? "visible" : "hidden"}}>
        <img src={`images/cards/${backgroundCard}/verso.png`}/>
    </div>
  );
}

export default Deck;