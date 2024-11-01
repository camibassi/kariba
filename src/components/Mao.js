import React, { useRef, useState } from 'react';
import Carta from './AvisoPosicaoCarta';

const Mao = (props) => 
{
    //essa função armazena o valor da carta arrastada da mão para a pilha e manda o valor para o componente pilha  
    function dragStart (e) {
        let cartaDiv = e.target.parentElement;
        let imagePath = e.target.attributes["src"].value;
        let parts = imagePath.split('/');
        let imageDrag = parts[parts.length - 1]; // 'verso.png'
        imageDrag = imageDrag.split('.')[0]; // 'verso' (sem o .png)

        e.dataTransfer.setData("cartaValor", imageDrag );
        e.dataTransfer.setData("cartaDiv", cartaDiv.attributes['id'].value );


    }

    return(
        <>
            <div id="mao">
                <div class="cartas" >
                {props.cartas.map(card => {
                    const retorno = [];
                    
                    for (let i = 0; i < card.quantity; i++) {
                        retorno.push(<Carta key={`${card.cardId}-${i}`} dragStart={dragStart} value={card.cardId} />);
                    }
                    return retorno;
                })}
                </div>
            </div>
        </>
    );
}

export default Mao;