import React, { useState } from 'react';
import Carta from './carta';

const Mao = (props) => 
{
    function dragStart (e) {
    }

    return(
        <>
            <div id="mao">
                <div class="cartas" >
                    <Carta value={2} dragStart={dragStart}/>
                    { map( i => <Carta value={i} dragStart={dragStart} />) }
                </div>
                <button onClick={adicionarCarta}>Adicionar</button>
            </div>
        </>
    );
}

export default Mao;