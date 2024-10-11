import { useState } from "react";

const useBoard = function() 
{
    const [jogada, setJogada] = useState([]);
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


    function mover(pilha, carta, guardarCartas)
    {
      let temp = [...jogada, carta];
      board[pilha].push( carta );
      let clone = Object.assign({}, board);

      let index = pilha - 1;
      if(index == 0)
        index = 8;

      if(clone[pilha].length >= 3)
      {
        while(!clone[index].length && index > 0)
          index--;

        guardarCartas(clone[index].length);

        clone[index] = [];
      }

      setBoard( clone );
      setJogada( temp );
      return true;
    }

    function finalizarJogada()
    {
    }

    return {
      mover,
      setBoard,
      board,
    }
}

export default useBoard;