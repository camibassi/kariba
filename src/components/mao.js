import React, { useRef, useState } from 'react';
import Carta from './carta';

const Mao = (props) => 
{
    function dragStart (e) {
    }

    return(
        <>
            <div id="mao">
                <div class="cartas" >
                    { props.cartas.cartas.map( i => <Carta value={i} dragStart={dragStart} />) }
                </div>
            </div>
        </>
    );
}

export default Mao;