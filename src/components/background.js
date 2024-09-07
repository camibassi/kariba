import { useRef } from "react";
import { useScroll } from "../hooks/scroll";
import ItemLoja from "./ItemLoja";

export default function Background() {
  const backgroundRef = useRef(null);
  const { scrollLeft, scrollRight } = useScroll(backgroundRef);

  return (
    <div>
      <h2>Planos de fundo</h2>
      <div className="decks-container">
        <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
        <div className="decks" id="planos" ref={backgroundRef}>
          {
            [{name: 'Deserto', imgSrc: 'images/natureza.png'},
              {name: 'Natureza', imgSrc: 'images/natureza2.png'},
              {name: 'Deserto 2', imgSrc: 'images/deserto.png'},
              {name: 'Deserto 2', imgSrc: 'images/deserto.png'},
              {name: 'Deserto 2', imgSrc: 'images/deserto.png'},
            ].map(item => <ItemLoja name={item.name} imgSrc={item.imgSrc}/>)
          }
        </div>
        <button className="scroll-button scroll-right" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
}
