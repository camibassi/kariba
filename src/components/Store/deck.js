import { useRef } from "react";
import { useDeckStore } from "../../hooks/deck_store";
import { useScroll } from "../../hooks/scroll";


export default function Deck() {
  const { hoveredImage, handleMouseEnter, handleMouseLeave } = useDeckStore();
  const deckRef = useRef(null);
  const { scrollLeft, scrollRight } = useScroll(deckRef);

  const decks = [
    { name: "Alice", path: "alice" },
    { name: "Criaturas", path: "criaturas" },
    { name: "Heróis", path: "heroes" },
    { name: "Pokemón", path: "pokemon" },
    { name: "Natal", path: "natal" },
    { name: "Halloween", path: "halloween" },
    { name: "Halloween 2", path: "halloween2" },
  ];

  return (
    <div>
      <h2>Decks</h2>
      <div className="decks-container-full">
        <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
        <div className="decks" ref={deckRef}>
          {decks.map((deck) => (
            <div key={deck.name}  class = "itemLoja">
              <h3>{deck.name}</h3>
              <img
                src={`images/cards/${deck.path}/${hoveredImage === deck.path ? "1.png" : "verso.png"}`}
                alt={`Tema ${deck.name}`}
                onMouseEnter={() => handleMouseEnter(deck.path)}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          ))}
        </div>
        <button className="scroll-button scroll-right" onClick={scrollRight}>{">"}</button>
      </div>
    </div>
  );
}
