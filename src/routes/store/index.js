import "../store/index.css";
import GroupCard from "../../components/groupCard";
import { useImageChange } from "../../hooks/altera_imagem";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaReply, FaRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Store() 
{
  const { handleMouseEnter, handleMouseLeave } = useImageChange();
  const navigate = useNavigate();

  return (
    <div>
      
      <h1>
        <img src="images/favicon.png" alt="Logo" /> Loja <img src="images/favicon.png" alt="Logo" />
      </h1>
      <div id="fundo">
        <div>
            <GroupCard 
              className="decks-container-full"
              name="Decks"
              itens={[
                { name: "Alice", imgSrc: "images/cards/alice/1.png"},
                { name: "Criaturas", imgSrc: "images/cards/criaturas/1.png" },
                { name: "Heróis", imgSrc: "images/cards/heroes/1.png" },
                { name: "Pokemón", imgSrc: "images/cards/pokemon/1.png" },
                { name: "Folclore", imgSrc: "images/cards/folclore/1.png" },
                { name: "Natal", imgSrc: "images/cards/natal/1.png" },
                { name: "Halloween", imgSrc: "images/cards/halloween/1.png" },
                { name: "Halloween 2", imgSrc: "images/cards/halloween2/1.png" },
              ]} 
            />
        </div>
        <div class="containerCentral">
            <GroupCard classNameDeck="imagemMenor" name="Item" itens={[
              {name: 'Item 1', imgSrc: 'images/natureza.png'},
              {name: 'Item 2', imgSrc: 'images/natureza2.png'},
              {name: 'Item 3', imgSrc: 'images/deserto.png'},
              {name: 'Item 4', imgSrc: 'images/deserto.png'},
              {name: 'Item 5', imgSrc: 'images/deserto.png'},
            ]}  />
            <GroupCard classNameDeck="imagemMenor" name="Item" itens={[
              {name: 'Item 1', imgSrc: 'images/natureza.png'},
              {name: 'Item 2', imgSrc: 'images/natureza.png'},
              {name: 'Item 3', imgSrc: 'images/natureza.png'},
              {name: 'Item 4', imgSrc: 'images/natureza.png'},
            ]}  />
        </div>
      </div>
    </div>
  );
}