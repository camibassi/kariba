import "../store/index.css";
import GroupCard from "../../components/groupCard";
import { useImageChange } from "../../hooks/altera_imagem";

export default function Store() 
{
  const { handleMouseEnter, handleMouseLeave } = useImageChange();

  return (
    <div>
      <h1>
        <img src="images/favicon.png" alt="Logo" /> Loja Kariba <img src="images/favicon.png" alt="Logo" />
      </h1>
      <div id="fundo">
        <div>
            <GroupCard 
              className="decks-container-full"
              name="Decks"
              itens={[
                { name: "Alice", imgSrc: "images/cards/alice/verso.png", onMouseLeave: () => handleMouseLeave('images/cards/alice/verso.png'), onMouseEnter: () => handleMouseEnter("images/cards/alice/1.png") },
                { name: "Criaturas", imgSrc: "images/cards/criaturas/verso.png" },
                { name: "Heróis", imgSrc: "images/cards/heroes/verso.png" },
                { name: "Pokemón", imgSrc: "images/cards/pokemon/verso.png" },
                { name: "Natal", imgSrc: "images/cards/natal/verso.png" },
                { name: "Halloween", imgSrc: "images/cards/halloween/verso.png" },
                { name: "Halloween 2", imgSrc: "images/cards/halloween2/verso.png" },
              ]} 
            />
        </div>
        <div class="containerCentral">
            <GroupCard classNameDeck="imagemMenor" name="Planos de Fundo" itens={[{name: 'Deserto', imgSrc: 'images/natureza.png'},
              {name: 'Natureza', imgSrc: 'images/natureza2.png'},
              {name: 'Deserto 2', imgSrc: 'images/deserto.png'},
              {name: 'Deserto 2', imgSrc: 'images/deserto.png'},
              {name: 'Deserto 2', imgSrc: 'images/deserto.png'},
            ]}  />
            <GroupCard classNameDeck="imagemMenor" name="Músicas" itens={[{name: 'Música 1', imgSrc: 'images/audio_icon.png'},
              {name: 'Música 2', imgSrc: 'images/audio_icon.png'},
              {name: 'Música 3', imgSrc: 'images/audio_icon.png'},
              {name: 'Música 4', imgSrc: 'images/audio_icon.png'},
            ]}  />
        </div>
      </div>
    </div>
  );
}