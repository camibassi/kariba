/*
const cartasMao = function() {
    const [cartas, setCartas] = useState([]);

    function adicionarCarta(valor)
    {

    }

    function removerCarta(valor)
    {
    }
}
*/
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
*/
import React, { useState } from 'react';


function CartasMao() {
  const [number, setNumber] = useState(4);
  function change()
  {
    setNumber( Math.round(Math.random()) );
    alert(number);
  }
}

export default CartasMao;