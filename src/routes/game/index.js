import Deck from "../../components/deck";
import Lagoa from "../../components/lagoa";
import Mao from "../../components/mao";
import Placar from "../../components/placar";
import Adversario from "../../components/adversario";

import "../game/index.css"
import UseCartasMao from "../../hooks/UseCartasMao";
import useShowHide from "../../hooks/showHide";
import { wait } from "@testing-library/user-event/dist/utils";

export default function Game() {

    const cartasMao = UseCartasMao();
    const visivel = useShowHide();
    
    async function iniciaPartida(){
        visivel.apareceCarta();
        cartasMao.adicionarCarta();
        cartasMao.adicionarCarta();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function finalizaPartida(){
    }

    return(
        <div>
            <Lagoa/>
            <div class= "botaoCancelar">
                <button 
                style={{ display: visivel.status === false ? "none" : "block"}}> Desfazer seleção</button>
            </div>

            <div id = "botoes">
                <button onClick={iniciaPartida}
                style={{ display: visivel.status === true ? "none" : "block"}}> Iniciar </button>
                <button onClick={finalizaPartida} 
                style={{ display: visivel.status === false ? "none" : "block"}}> Finalizar jogada </button>
            </div>
            <Deck cartas={cartasMao} visibilidade={visivel}/>
            <Placar/>
            <Mao cartas={cartasMao} />
            <Adversario visibilidade={visivel}/>
        </div>
      );
}