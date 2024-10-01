import "../store/index.css";
import GroupCard from "../../components/groupCard";
import { useImageChange } from "../../hooks/altera_imagem";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaEye, FaLock, FaReply, FaRightLong } from "react-icons/fa6";
import { useNavigate, useOutletContext } from "react-router-dom";
import MenuNavbar from "../../components/menuNavbar";
import { FaRegEye } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";

export default function Store() 
{
  const { user } = useContext(AuthContext); 
  const context = useOutletContext();
  const cadeado = () => <FaLock style={{
      fontSize: '2rem',
      color: 'white',
  }}/>;
  const olho = () => <FaRegEye style={{
      fontSize: '2rem',
      color: 'white',
  }}/>;

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
                { 
                  name: "Padrão", 
                  imgSrc: "/images/cards/default/1.png", 
                  styleSrc: (context.backgroundCard == 'default'|| !user.decksPermitidos.includes('default')) &&  {opacity: '50%'},
                  onClick: () => context.setBackgroundCard('default'),
                  children: (!user.decksPermitidos.includes('default') && cadeado()) ||
                    (context.backgroundCard == 'default' && olho())
                },
                { 
                  name: "Alice", 
                  imgSrc: "/images/cards/alice/1.png", 
                  onClick: () => context.setBackgroundCard('alice'),
                  styleSrc: (context.backgroundCard == 'alice'|| !user.decksPermitidos.includes('alice')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('alice') && cadeado()) ||
                    (context.backgroundCard == 'alice' && olho())
                },
                { 
                  name: "Animais", 
                  imgSrc: "/images/cards/animais/1.png", 
                  onClick: () => context.setBackgroundCard('animais'),
                  styleSrc: (context.backgroundCard == 'animais'|| !user.decksPermitidos.includes('animais')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('animais') && cadeado()) ||
                  (context.backgroundCard == 'animais' && olho()) 
                },
                { 
                  name: "Criaturas", 
                  imgSrc: "/images/cards/criaturas/1.png", 
                  onClick: () => context.setBackgroundCard('criaturas') ,
                  styleSrc: (context.backgroundCard == 'criaturas'|| !user.decksPermitidos.includes('criaturas')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('criaturas') && cadeado()) ||
                  (context.backgroundCard == 'criaturas' && olho())
                },
                { 
                  name: "Heróis", 
                  imgSrc: "/images/cards/heroes/1.png", 
                  onClick: () => context.setBackgroundCard('heroes'),
                  styleSrc: (context.backgroundCard == 'heroes'|| !user.decksPermitidos.includes('heroes')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('heroes') && cadeado()) ||
                  (context.backgroundCard == 'heroes' && olho())
                },
                { 
                  name: "Pokemón", 
                  imgSrc: "/images/cards/pokemon/1.png", 
                  onClick: () => context.setBackgroundCard('pokemon'),
                  styleSrc: (context.backgroundCard == 'pokemon'|| !user.decksPermitidos.includes('pokemon')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('pokemon') && cadeado()) ||
                  (context.backgroundCard == 'pokemon' && olho())
                },
                {
                  name: "Folclore", 
                  imgSrc: "/images/cards/folclore/1.png", 
                  onClick: () => context.setBackgroundCard('folclore'),
                  styleSrc: (context.backgroundCard == 'folclore'|| !user.decksPermitidos.includes('folclore')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('folclore') && cadeado()) ||
                  (context.backgroundCard == 'folclore' && olho())
                },
                { 
                  name: "Natal", 
                  imgSrc: "/images/cards/natal/1.png", 
                  onClick: () => context.setBackgroundCard('natal'),
                  styleSrc: (context.backgroundCard == 'natal'|| !user.decksPermitidos.includes('natal')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('natal') && cadeado()) ||
                  (context.backgroundCard == 'natal' && olho())
                },
                { 
                  name: "Halloween", 
                  imgSrc: "/images/cards/halloween/1.png", 
                  onClick: () => context.setBackgroundCard('halloween'),
                  styleSrc: (context.backgroundCard == 'halloween'|| !user.decksPermitidos.includes('halloween')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('halloween') && cadeado()) ||
                  (context.backgroundCard == 'halloween' && olho())
                },
                { 
                  name: "Halloween 2", 
                  imgSrc: "/images/cards/halloween2/1.png", 
                  onClick: () => context.setBackgroundCard('halloween2'),
                  styleSrc: (context.backgroundCard == 'halloween2'|| !user.decksPermitidos.includes('halloween2')) &&  {opacity: '50%'},
                  children: (!user.decksPermitidos.includes('halloween2') && cadeado()) ||
                  (context.backgroundCard == 'halloween2' && olho())
                },
              ]} 
            />
        </div>
        <div class="containerCentral">
            <GroupCard classNameDeck="imagemMenor" name="Planos de Fundo" itens={[
              {name: 'Natureza', imgSrc: '/images/natureza.png', onClick: () => context.setBackground('/images/natureza.png')},
              {name: 'Natureza (2)', imgSrc: '/images/natureza3.png', onClick: () => context.setBackground('/images/natureza3.png')},
              {name: 'Deserto', imgSrc: '/images/deserto.png', onClick: () => context.setBackground('/images/deserto.png')},
              {name: 'Mata', imgSrc: '/images/fundoRegras.png', onClick: () => context.setBackground('/images/fundoRegras.png')},
              {name: 'Heróis', imgSrc: '/images/heroes.png', onClick: () => context.setBackground('/images/heroes.png')},
              {name: 'Halloween', imgSrc: '/images/halloween.png', onClick: () => context.setBackground('/images/halloween.png')},
              {name: 'Natal', imgSrc: '/images/natal.png', onClick: () => context.setBackground('/images/natal.png')},
              {name: 'Natal (2)', imgSrc: '/images/natal2.png', onClick: () => context.setBackground('/images/natal2.png')},
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