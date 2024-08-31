import Deck from "../../components/Membro/deck";
import Lagoa from "../../components/Membro/lagoa";
import Mao from "../../components/Membro/mao";
import Placar from "../../components/Membro/placar";

export default function Game() {
    return(
        <div>
            <Lagoa />
            <Deck/>
            <Placar/>
            <Mao />
        </div>
      );
}