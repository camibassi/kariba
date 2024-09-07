import Deck from "../../components/deck";
import Lagoa from "../../components/lagoa";
import Mao from "../../components/mao";
import Placar from "../../components/placar";
import Adversario from "../../components/adversario";

import "../game/index.css"
import UseCartasMao from "../../hooks/UseCartasMao";
import useShowHide from "../../hooks/showHide";

export default function Game() {

    const cartasMao = UseCartasMao();
    const visivel = useShowHide();
    
    return(
        <div>
            <Lagoa />
            <div id = "finalizar">
                <button onClick={visivel.apareceCarta}> Iniciar </button>
                <button > Finalizar jogada </button>
            </div>
            <Deck cartas={cartasMao} visibilidade={visivel}/>
            <Placar/>
            <Mao cartas={cartasMao} />
            <Adversario/>
        </div>
      );
}