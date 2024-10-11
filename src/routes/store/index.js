import "../store/index.css";
import GroupCard from "../../components/GroupCard";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaEye, FaLock, FaReply, FaRightLong } from "react-icons/fa6";
import { useNavigate, useOutletContext } from "react-router-dom";
import MenuNavbar from "../../components/MenuNavbar";
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

  const render = (item, nome) => {
    const objeto = { 
      name: nome, 
      item: item,
      verso: true,
      imgSrc: `/images/cards/${item}/1.png`, 
      styleSrc: (context.backgroundCard == item|| !user.decksPermitidos.includes(item)) &&  {opacity: '50%'},
      onClick: () => context.setBackgroundCard(item),
      children: (!user.decksPermitidos.includes(item) && cadeado()) ||
        (context.backgroundCard == item && olho())
    };

    return objeto;
  }

  return (
    <div style={{overflow: 'hidden'}}>
      
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
                render('default', 'Padrão'),
                render('alice', 'Alice'),
                render('animais', 'Animais'),
                render('criaturas', 'Criaturas'),
                render('heroes', 'Pokemón'),
                render('pokemon', 'Animais'),
                render('folclore', 'Folclore'),
                render('animais', 'Animais'),
                render('animais', 'Animais'),
                render('animais', 'Animais'),
                render('natal', 'Natal'),
                render('natal', 'Natal'),
                render('halloween', 'Halloween'),
                render('halloween2', 'Halloween ')
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