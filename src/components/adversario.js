import React, {Component} from 'react';
import { useOutletContext } from 'react-router-dom';

const Adversario = (props) => {

    let visible = props.visibilidade.status;
    const backgroundCard = useOutletContext().backgroundCard;

      return(
        <div id = "maoAdversario" style={{ visibility: visible == true ? "visible" : "hidden"}}>
            <div class ="adversario">
                <img src={`images/cards/${backgroundCard}/verso.png`}/> 
            </div>
            <div class ="adversario">
                <img src={`images/cards/${backgroundCard}/verso.png`}/> 
            </div>
            <div class ="adversario">
                <img src={`images/cards/${backgroundCard}/verso.png`}/> 
            </div>
            <div class ="adversario">
                <img src={`images/cards/${backgroundCard}/verso.png`}/> 
            </div>
            <div class ="adversario">
                <img src={`images/cards/${backgroundCard}/verso.png`}/> 
            </div>
        </div>


    );
}

export default Adversario;