import React, { useRef, useState } from 'react';
import Carta from './Carta';

const Mao = (props) => 
{
   
    //Funçao anterior dando erro objeto sem valor ou indefinido
    // essa função armazena o valor da carta arrastada da mão para a pilha e manda o valor para o componente pilha  
   // function dragStart (e) {
     //   let cartaDiv = e.target.parentElement;
       // let imagePath = e.target.attributes["src"].value;
       // let parts = imagePath.split('/');
       // let imageDrag = parts[parts.length - 1]; // 'verso.png'
       // imageDrag = imageDrag.split('.')[0]; // 'verso' (sem o .png)
                
       // e.dataTransfer.setData("cartaValor", imageDrag );
       // e.dataTransfer.setData("cartaDiv", cartaDiv.attributes['id'].value );

    //}

     // essa função armazena o valor da carta arrastada da mão para a pilha e manda o valor para o componente pilha  
    function dragStart(e) {
        // Confirma se e.target e e.target.attributes["src"] estão definidos
        if (e.target && e.target.attributes["src"]) {
            let cartaDiv = e.target.parentElement;
            let imagePath = e.target.attributes["src"].value;
            let parts = imagePath.split('/');
            let imageDrag = parts[parts.length - 1]; // 'verso.png'
            imageDrag = imageDrag.split('.')[0]; // 'verso' (sem o .png)
    
            // Verifica se `cartaDiv` possui um ID e se `imageDrag` está definido
            if (cartaDiv && cartaDiv.attributes['id'] && imageDrag) {
                e.dataTransfer.setData("cartaValor", imageDrag);
                e.dataTransfer.setData("cartaDiv", cartaDiv.attributes['id'].value);
            } else {
                console.error("Elemento ou atributos estão indefinidos.");
            }
        } else {
            console.error("O atributo 'src' está ausente no elemento alvo.");
        }
    }
    
    return(
        <>
            <div id="mao">
                <div class="cartas" >
                {props.cartas.map(card => {
                    const retorno = [];
                    
                    for (let i = 0; i < card.quantity; i++) {
                        retorno.push(<Carta minhaVez={props.minhaVez} key={`${card.cardId}-${i}`} dragStart={dragStart} value={card.cardId} />);
                    }
                    return retorno;
                })}
                </div>
            </div>
        </>
    );
}

export default Mao;