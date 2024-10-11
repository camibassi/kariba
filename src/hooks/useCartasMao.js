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
        
        setCartas( tmp.concat(cartas) );
      }

    function removerCarta(valor)
    {
      setCartas(cartas.filter(carta => carta != valor));
    }

    return {
      adicionarCarta,
      removerCarta,
      setCartas,
      cartas
    }
}

export default UseCartasMao;