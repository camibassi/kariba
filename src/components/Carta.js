import React, { useState } from 'react';
import useApareceMouse from '../hooks/useApareceMouse';
import { useOutletContext } from 'react-router-dom';

export default function Carta(props) {
    let imgCarta = 'teste';
    let card = props.value.toString();
    let uid = "carta" + parseInt(Math.random() * 100000);
    const backgroundCard = useOutletContext().backgroundCard;

    const { mostrarMensagem, onMouseEnter, onMouseLeave } = useApareceMouse();
    const [showNotMyTurnMessage, setShowNotMyTurnMessage] = useState(false);

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
            onDragStart={props.minhaVez ? props.dragStart : undefined} // Define dragStart somente se for a vez
            onMouseEnter={() => {
                onMouseEnter();
                if (!props.minhaVez) setShowNotMyTurnMessage(true); // Exibe a mensagem se não for a vez
            }}
            onMouseLeave={() => {
                onMouseLeave();
                setShowNotMyTurnMessage(false); // Oculta a mensagem ao sair do mouse
            }}
        >
            <img 
            draggable={props.minhaVez} // Permite arrastar somente se for a vez            
            style={{
                cursor: props.minhaVez ? 'grab' : 'not-allowed', // Muda o cursor dependendo da vez
            }}
            src={imgCarta} alt="Carta" />
            {mostrarMensagem === 1 && props.minhaVez && ( // Exibe a mensagem de arraste apenas se for a vez
                <div className="cartaMensagem">
                    Arraste a carta até a posição correta
                </div>
            )}
            {showNotMyTurnMessage && !props.minhaVez && ( // Exibe a mensagem de não é a vez
                <div className="cartaMensagem">
                    Não é sua vez
                </div>
            )}
        </div>
    );
}
