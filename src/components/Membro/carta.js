import React from 'react';

export default function Carta(props) 
{
    let imgCarta = 'teste';
    let card = props.value.toString()    
    switch(card){
        case "1": imgCarta = 'images/cards/default/1.png'; break;
        case "2": imgCarta = 'images/cards/default/2.png'; break;
        case "3": imgCarta = 'images/cards/default/3.png'; break;
        case "4": imgCarta = 'images/cards/default/4.png'; break;
        case "5": imgCarta = 'images/cards/default/5.png'; break;
        case "6": imgCarta = 'images/cards/default/6.png'; break;
        case "7": imgCarta = 'images/cards/default/7.png'; break;
        case "8": imgCarta = 'images/cards/default/8.png'; break;
        case "9": imgCarta = 'images/cards/default/9.png'; break;
        case "verso": imgCarta = 'images/cards/default/verso.png'; break;
        default: imgCarta = 'teste2'; break;
    }

    return <div class="carta">
        <img src={imgCarta} />             
    </div>
}