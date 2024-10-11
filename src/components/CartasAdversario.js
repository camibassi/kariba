import React from 'react';
import { useOutletContext } from 'react-router-dom';

const CartasAdversario = (props) => {

    let visible = props.visibilidade.status;
    const backgroundCard = useOutletContext().backgroundCard;

      return(
        <div id="maoAdversario" style={{ visibility: visible == true ? "visible" : "hidden"}}>
            {[1, 2, 3, 4, 5].map(() => 
                <div class ="adversario">
                    <img src={`images/cards/${backgroundCard}/verso.png`}/> 
                </div>
            )}
        </div>


    );
}

export default CartasAdversario;