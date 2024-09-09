import { useState } from "react";

const useShowHide = function() 
{
    const [status, setStatus] = useState(false);

    function apareceCarta() {
        setStatus(true);
    }

    return {
        status,
        apareceCarta
    }
}

export default useShowHide;