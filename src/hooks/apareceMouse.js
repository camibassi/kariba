import { useState } from "react";

const useApareceMouse = function() 
{
    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    function onMouseEnter() {
        setMostrarMensagem(true);    }

    function onMouseLeave() {
        setMostrarMensagem(false);
    }

    return {
        mostrarMensagem,
        onMouseEnter,
        onMouseLeave
    }
}

export default useApareceMouse;