import "../store/index.css";
import { useRef } from "react";
import { useState } from "react";

export default function Store() {
    const [hoveredImage, setHoveredImage] = useState("");

    const handleMouseEnter = (imgPath) => {
      setHoveredImage(imgPath);
    };
  
    const handleMouseLeave = () => {
      setHoveredImage("");
    };  

    const deckRef = useRef(null);

  const scrollLeft = () => {
    deckRef.current.scrollBy({
      left: -150, // Quantidade que será rolada para a esquerda
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    deckRef.current.scrollBy({
      left: 150, // Quantidade que será rolada para a direita
      behavior: "smooth"
    });
  };

  return (
    <div>
      <h1>
        <img src="images/favicon.png" alt="Logo" /> Loja Kariba <img src="images/favicon.png" alt="Logo" />
      </h1>
      <div id = "fundo">
        <div>
                <h2>Decks</h2>
                <div className="decks-container">
                    <button className="scroll-button scroll-left" onClick={scrollLeft}>{"<"}</button>
                            <div className="decks" ref={deckRef}>
                                {[
                                { name: "Alice", path: "alice" },
                                { name: "Criaturas", path: "criaturas" },
                                { name: "Heróis", path: "heroes" },
                                { name: "Natal", path: "natal" },
                                { name: "Halloween", path: "halloween" },
                                { name: "Halloween 2", path: "halloween2" },
                                ].map((deck) => (
                                        <div key={deck.name}>
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
        <div>
            <h2>Planos de fundo</h2>
                <div className = "decks" id = "planos">
                    <div>
                        <h3>Deserto</h3>
                        <img src="images/natureza.png" alt="Deserto" />           
                    </div>
                    <div>
                        <h3>Natureza</h3>
                        <img src="images/natureza2.png" alt="Natureza" />           
                    </div>
                    <div>
                        <h3>Deserto2</h3>
                        <img src="images/deserto.png" alt="Deserto2" />           
                    </div>
                </div>
        </div>
        <div class = "right">
        <div>
            <h2>Músicas</h2>
                <div className = "decks" id = "planos">
                    <div>
                        <h3>Deserto</h3>
                        <img src="images/natureza.png" alt="Deserto" />           
                    </div>
                    <div>
                        <h3>Natureza</h3>
                        <img src="images/natureza2.png" alt="Natureza" />           
                    </div>
                    <div>
                        <h3>Deserto2</h3>
                        <img src="images/deserto.png" alt="Deserto2" />           
                    </div>
                </div>
        </div>
        </div>
       </div>
    </div>
  );
}
