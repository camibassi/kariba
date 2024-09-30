import "../store/index.css";
import GroupCard from "../../components/groupCard";
import { useImageChange } from "../../hooks/altera_imagem";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaReply, FaRightLong } from "react-icons/fa6";
import { useNavigate, useOutletContext } from "react-router-dom";
import MenuNavbar from "../../components/menuNavbar";

export default function Store() 
{
  const { handleMouseEnter, handleMouseLeave } = useImageChange();
  const navigate = useNavigate();
  const context = useOutletContext();
  console.log(context);
  return (
    <div>
      
      <MenuNavbar>
      <h1>
        <img src="/images/favicon.png" alt="Logo" /> Loja <img src="/images/favicon.png" alt="Logo" />
      </h1>
      </MenuNavbar>
      <div id="fundo">
        <div>
            <GroupCard 
              className="decks-container-full"
              name="Decks"
              itens={[
                { name: "Alice", imgSrc: "/images/cards/alice/1.png"},
                { name: "Animais", imgSrc: "/images/cards/animais/1.png" },
                { name: "Criaturas", imgSrc: "/images/cards/criaturas/1.png" },
                { name: "Heróis", imgSrc: "/images/cards/heroes/1.png" },
                { name: "Pokemón", imgSrc: "/images/cards/pokemon/1.png" },
                { name: "Folclore", imgSrc: "/images/cards/folclore/1.png" },
                { name: "Natal", imgSrc: "/images/cards/natal/1.png" },
                { name: "Halloween", imgSrc: "/images/cards/halloween/1.png" },
                { name: "Halloween 2", imgSrc: "/images/cards/halloween2/1.png" },
              ]} 
            />
        </div>
        <div class="containerCentral">
            <GroupCard classNameDeck="imagemMenor" name="Planos de Fundo" itens={[
              {name: 'Natureza', imgSrc: '/images/natureza.png', onClick: () => context.setBackground('/images/natureza.png')},
              {name: 'Deserto', imgSrc: '/images/deserto.png', onClick: () => context.setBackground('/images/deserto.png')}
            ]}  />
            <GroupCard classNameDeck="imagemMenor" name="Músicas" itens={[
              {name: 'Item 1', imgSrc: '/images/audio_icon.png'},
              {name: 'Item 2', imgSrc: '/images/audio_icon.png'},
              {name: 'Item 3', imgSrc: '/images/audio_icon.png'},
              {name: 'Item 4', imgSrc: '/images/audio_icon.png'},
            ]}  />
        </div>
      </div>
    </div>
  );
}