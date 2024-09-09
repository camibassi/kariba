import { useState } from "react";

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