import React, { useRef, useState } from 'react';
import Carta from './carta';

const Mao = (props) => 
{
    //essa função armazena o valor da carta arrastada da mão para a pilha e manda o valor para o componente pilha  
    function dragStart (e) {
        console.log(e.target); // A imagem que a gente moveu
        console.log(e.target.parentElement); // a div que contem a imagem (parent)

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
                    { props.cartas.cartas.map( i => <Carta value={i} dragStart={dragStart} />) }
                </div>
            </div>
        </>
    );
}

export default Mao;