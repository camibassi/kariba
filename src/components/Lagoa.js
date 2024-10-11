// Lagoa.js
import React from 'react';
import Pilha from './Pilha';
import useBoard from '../hooks/useBoard';

export default function Lagoa(props) {
  return (
    <div id="lagoa" style={{ position: 'relative' }}>
      <img className="imgLagoa" src="images/lagoa.png" alt="Lagoa" />
      
      <div className="envelope">
        {[
          { id: 1, img: "images/cards/default/1.png" },
          { id: 2, img: "images/cards/default/2.png" },
          { id: 3, img: "images/cards/default/3.png" },
          { id: 4, img: "images/cards/default/4.png" },
          { id: 5, img: "images/cards/default/5.png" },
          { id: 6, img: "images/cards/default/6.png" },
          { id: 7, img: "images/cards/default/7.png" },
          { id: 8, img: "images/cards/default/8.png" },
        ].map(item => <Pilha guardarCartas={props.guardarCartas}
          cartas={props.cartas} value={item} id={`pilha${item.id}`} board={props.board}/>)}
      </div>
    </div>
  );
}