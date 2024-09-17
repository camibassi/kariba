import React, { useRef, useState } from 'react';
import Carta from './carta';

const Mao = (props) => 
{
    //essa função armazena o valor da carta arrastada da mão para a pilha e manda o valor para o componente pilha  
    function dragStart (e) {
        console.log(e.target.attributes["src"].value);
        const imagePath = e.target.attributes["src"].value;
        const parts = imagePath.split('/');
        let imageDrag = parts[parts.length - 1]; // 'verso.png'
        imageDrag = imageDrag.split('.')[0]; // 'verso' (sem o .png)
        e.dataTransfer.setData("cartaDrag",imageDrag);
        console.log(imageDrag);
//        const folderPath = parts.slice(0, parts.length - 1).join('/'); // 'images/cards/default'

//        console.log('File Name:', fileName);
//        console.log('Folder Path:', folderPath);

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