import { useState } from "react";

/*
UseCartasMao obj = new UseCartasMao()
obj.cartas = [];
obj.adicionarCarta(){ 
   // Adiciona uma carta
}
obj.removeCarta() {}
*/
const UseCartasMao = function() 
{
    const [cartas, setCartas] = useState([]);

    function adicionarCarta() {
        let tmp = [];
        let i = 5 - cartas.length;
        if( i == 0) 
          return ;
        for( let c = 0; c < i; c++)
        {
          let card = Math.round( Math.random()*8 )+1;
          tmp.push(card);
        }
        
        setCartas( tmp.concat(cartas) );
        console.log("depois", cartas );
      }

    function removerCarta(valor)
    {
      alert(cartas);
    }

    return {
      adicionarCarta,
      removerCarta,
      setCartas,
      cartas
    }
}

export default UseCartasMao;
/*
import React, { useState } from 'react';


function cartasMao() {
  const [cartas, setCartas] = useState(["1", "3", "4", "5", "6"]);
  
  const [input, setInput] = useState('');

  function handleAdd(){
    setCartas([...cartas, input])
  }



  return (
    <div>

      <ul>
        {cartas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>

      <input type="text" value={input} onChange={e => setInput(e.target.value)}/>    
      <button type="button" onClick={handleAdd}>Adicionar</button>

    </div>
  );
}

export default cartasMao;

import React, { useState } from 'react';


function CartasMao() {
  const [number, setNumber] = useState(4);
  function change()
  {
    setNumber( Math.round(Math.random()) );
    alert(number);
  }
}

export default CartasMao; */