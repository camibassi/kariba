import React, { useRef, useState } from 'react';
import Carta from './carta';

const Mao = (props) => 
{
    return(
        <>
            <div id="mao">
                <div class="cartas">
                    { props.cartas.cartas.map( i => <Carta value={i} />) }
                </div>
            </div>
        </>
    );
}

export default Mao;