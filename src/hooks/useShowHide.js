import { useState } from "react";

const useShowHide = function() 
{
    const [status, setStatus] = useState(true);

    function apareceCarta() {

    }

    return {
        status,
        apareceCarta
    }
}

export default useShowHide;