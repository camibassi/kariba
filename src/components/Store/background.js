import { useRef } from "react";
import { useScroll } from "../../hooks/scroll";

export default function Background() {
  const backgroundRef = useRef(null);
  const { scrollLeft, scrollRight } = useScroll(backgroundRef);

  return (
    <div>
      <h2>Planos de fundo</h2>
      <div className="decks-container">
        <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
        <div className="decks" id="planos" ref={backgroundRef}>
          <div class = "itemLoja">
            <h3>Deserto</h3>
            <img src="images/natureza.png" alt="Deserto" />
          </div>
          <div class = "itemLoja">
            <h3>Natureza</h3>
            <img src="images/natureza2.png" alt="Natureza" />
          </div>
          <div class = "itemLoja">
            <h3>Deserto2</h3>
            <img src="images/deserto.png" alt="Deserto2" />
          </div>
          <div class = "itemLoja">
            <h3>Deserto2</h3>
            <img src="images/deserto.png" alt="Deserto2" />
          </div>
          <div class = "itemLoja">
            <h3>Deserto2</h3>
            <img src="images/deserto.png" alt="Deserto2" />
          </div>
            
        </div>
        <button className="scroll-button scroll-right" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
}
