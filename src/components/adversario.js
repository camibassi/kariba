import React, {Component} from 'react';

const Adversario = (props) => {

    let visible = props.visibilidade.status;

      return(
        <div id = "maoAdversario" style={{ visibility: visible == true ? "visible" : "hidden"}}>
            <div class ="adversario">
                <img src="images/cards/default/verso.png"/> 
            </div>
            <div class ="adversario">
                <img src="images/cards/default/verso.png"/> 
            </div>
            <div class ="adversario">
                <img src="images/cards/default/verso.png"/> 
            </div>
            <div class ="adversario">
                <img src="images/cards/default/verso.png"/> 
            </div>
            <div class ="adversario">
                <img src="images/cards/default/verso.png"/> 
            </div>
        </div>


    );
}

export default Adversario;