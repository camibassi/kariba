import React from 'react';
import { useOutletContext } from 'react-router-dom';

const CartasAdversario = (props) => {

    let visible = props.visibilidade.status;
    const backgroundCard = useOutletContext().backgroundCard;
    
    let totalCartas = 0;
    if( props.cartas ) 
        totalCartas = parseInt(props.cartas);
    
      return(
        <div id="maoAdversario" style={{ visibility: visible == true ? "visible" : "hidden"}}>
            { [...Array(totalCartas).keys()].map(() => 
                <div class ="adversario">
                    <img src={`images/cards/${backgroundCard}/verso.png`}/> 
                </div>
            )}
        </div>


    );
}

export default CartasAdversario;