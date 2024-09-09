import "../store/index.css";
import Deck from "../../components/deckStore";
import Background from "../../components/background";
import Music from "../../components/music";

export default function Store() {
  return (
    <div>
      <h1>
        <img src="images/favicon.png" alt="Logo" /> Loja Kariba <img src="images/favicon.png" alt="Logo" />
      </h1>
      <div id="fundo">
        <div>
            <Deck />
        </div>
        <div class = "containerCentral">
            <Background />
            <Music />
        </div>
      </div>
    </div>
  );
}
