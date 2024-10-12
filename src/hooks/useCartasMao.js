import { useState } from "react";

const UseCartasMao = function(props) 
{
    const [cartas, setCartas] = useState([]);

    const numeroAleatorio = () => 
      Math.round( Math.random()*8 )+1
    
    function adicionarCarta() {
        let tmp = [];
        let i = 5 - cartas.length;
        if( i == 0) 
          return ;
        for( let c = 0; c < i; c++)
        {
          let card = numeroAleatorio();

          while(cartas.includes(card))
            card = numeroAleatorio();

          tmp.push(card);
        }
        
        setCartas( cartas.concat(tmp) );
      }

    function removerCarta(valor)
    {
      // Remove uma carta do array
      valor = parseInt(valor);
      let index = cartas.indexOf(valor);
      if( index >= 0 )
      {
        cartas.splice(index, 1);
        setCartas( cartas );
      }
    }

    return {
      adicionarCarta,
      removerCarta,
      setCartas,
      cartas
    }
}

export default UseCartasMao;