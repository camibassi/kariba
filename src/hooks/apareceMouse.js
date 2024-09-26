import { useState } from "react";

const useApareceMouse = function() 
{
    const [mostrarMensagem, setMostrarMensagem] = useState(0);

    function onMouseEnter() 
    {
        
        setMostrarMensagem(mostrarMensagem+1);
    }

    function onMouseLeave() 
    {
        setMostrarMensagem(mostrarMensagem+1);
    }

    return {
        mostrarMensagem,
        onMouseEnter,
        onMouseLeave
    }
}

export default useApareceMouse;