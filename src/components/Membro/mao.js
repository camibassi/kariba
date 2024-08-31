import React from 'react';
import Carta from '../carta';

const Mao = (props) => 
{
    return(
    <div id="mao">
        <div class="cartas">
        {
            ["images/cards/default/1.png", 'images/cards/default/2.png', 
                'images/cards/default/3.png', 
                'images/cards/default/4.png', 'images/cards/default/5.png'].map(item => <Carta img={item} />)
        } 
        </div>
    </div>
    );
}

export default Mao;