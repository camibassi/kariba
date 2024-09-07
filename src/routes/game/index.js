import Deck from "../../components/Membro/deck";
import Lagoa from "../../components/Membro/lagoa";
import Mao from "../../components/Membro/mao";
import Placar from "../../components/Membro/placar";
import Adversario from "../../components/Membro/adversario";

import "../game/index.css"

export default function Game() {
    return(
        <div>
            <Lagoa />
            <div id = "finalizar">
                <button > Finalizar jogada </button>
            </div>
            <Deck/>
            <Placar/>
            <Mao />
            <Adversario/>
        </div>
      );
}