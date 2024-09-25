import { useState } from "react";

const useBoard = function() 
{
    const [board, setBoard] = useState({
      "1": [],
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
      "8": []
    });

    function mover(pilha, carta)
    {
        board[pilha].push( carta );
        
        // Cria uma copia para forçar o render nos componentes.
        // Sem isso o framework não detecta que houve uma alteração no state e não renderiza a tela.
        let clone = Object.assign({}, board);
        setBoard( clone );
    }

    return {
      mover,
      setBoard,
      board
    }
}

export default useBoard;