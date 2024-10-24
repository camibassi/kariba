import React, {useState} from 'react';
import useApareceMouse from '../hooks/useApareceMouse';
import { useOutletContext } from 'react-router-dom';

export default function Carta(props) 
{
    let imgCarta = 'teste';
    let card = props.value.toString();
    let uid = "carta" + parseInt(Math.random() * 100000);
    const backgroundCard = useOutletContext().backgroundCard;

    const { mostrarMensagem, onMouseEnter, onMouseLeave } = useApareceMouse(); // Usa o hook
    
    switch(card){
        case "1": imgCarta = `images/cards/${backgroundCard}/1.png`; break;
        case "2": imgCarta = `images/cards/${backgroundCard}/2.png`; break;
        case "3": imgCarta = `images/cards/${backgroundCard}/3.png`; break;
        case "4": imgCarta = `images/cards/${backgroundCard}/4.png`; break;
        case "5": imgCarta = `images/cards/${backgroundCard}/5.png`; break;
        case "6": imgCarta = `images/cards/${backgroundCard}/6.png`; break;
        case "7": imgCarta = `images/cards/${backgroundCard}/7.png`; break;
        case "8": imgCarta = `images/cards/${backgroundCard}/8.png`; break;
        case "9": imgCarta = `images/cards/${backgroundCard}/9.png`; break;
        case "verso": imgCarta = `images/cards/${backgroundCard}/verso.png`; break;
        default: imgCarta = 'teste2'; break;
    }


    return (
        <div 
            id={uid} 
            className="carta" 
            draggable 
            onDragStart={props.dragStart}
            onMouseEnter={onMouseEnter}  // Adiciona o evento de drag enter
            onMouseLeave={onMouseLeave}  // Adiciona o evento de drag leave
        >
            <img src={imgCarta} alt="Carta" />
            {mostrarMensagem == 1 && (  // Exibe a mensagem apenas se mostrarMensagem for true
                <div className="cartaMensagem">
                    Arraste a carta até a posição correta
                </div>
            )}
        </div>
    );
}