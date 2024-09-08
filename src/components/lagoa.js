import React from 'react';
import Pilha from './pilha';

export default function Lagoa(props)
{
      return(
        <div id ="lagoa">
              <img class="imgLagoa" src="images/lagoa.png" />
              <div class="envelope">
                {
                  [
                  { id: 1, img: "images/cards/default/1.png"}, 
                  { id: 2, img: 'images/cards/default/2.png' }, 
                  { id: 3, img: 'images/cards/default/3.png' }, 
                  { id: 4, img: 'images/cards/default/4.png' }, 
                  { id: 5, img: 'images/cards/default/5.png' }, 
                  { id: 6, img: 'images/cards/default/6.png' }, 
                  { id: 7, img: 'images/cards/default/7.png' }, 
                  { id: 8, img: 'images/cards/default/8.png' },
                ].map(item => <Pilha value={item} id={`pilha${item.id}`} />)
                }
              </div>
        </div>
      );
}