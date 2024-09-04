import React, { useState } from 'react';
import Carta from './carta';

const Mao = (props) => 
{
    const [cartas, setCartas] = useState([ ]);

    function adicionarCarta() {
        let card = Math.round( Math.random()*8 )+1;
        console.log( card );
        setCartas([ ...cartas, card ] );
    }

    return(
        <>
            <div id="mao">
                <div class="cartas">
                    { cartas.map( i => <Carta value={i} />) }
                </div>
                <button onClick={adicionarCarta}>Adicionar</button>
            </div>
        </>
    );
}

export default Mao;