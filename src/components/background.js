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
              {name: 'Deserto 2', imgSrc: 'images/deserto.png'},
              {name: 'Natureza', imgSrc: 'images/natureza3.png'},
              {name: 'Natureza 2', imgSrc: 'images/natureza2.png'},
              {name: 'Pokemón', imgSrc: 'images/pokemon1.png'},
              {name: 'Pokemón 2', imgSrc: 'images/pokemon2.png'},
              {name: 'Pokemón 3', imgSrc: 'images/pokemon3.png'},
              {name: 'Natal', imgSrc: 'images/natal.png'},
              {name: 'Natal 2', imgSrc: 'images/natal2.png'},
            ].map(item => <ItemLoja name={item.name} imgSrc={item.imgSrc}/>)
          }
        </div>
        <button className="scroll-button scroll-right" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
}
