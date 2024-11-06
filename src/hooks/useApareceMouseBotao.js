import { useState } from "react";

const useApareceMouseBotao = function() 
{
    const [mostrarMensagem, setMostrarMensagem] = useState(0);

    function onMouseEnter() 
    {
        
        setMostrarMensagem(1);
    }

    function onMouseLeave() 
    {
        setMostrarMensagem(0);
    }

    return {
        mostrarMensagem,
        onMouseEnter,
        onMouseLeave
    }
}

export default useApareceMouseBotao;