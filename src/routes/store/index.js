import "../store/index.css";
import GroupCard from "../../components/GroupCard";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import MenuNavbar from "../../components/MenuNavbar";
import { FaLock, FaRegEye } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";

export default function Store() {
  const { user } = useContext(AuthContext);
  const context = useOutletContext();
  
  const renderCardProps = (item, nome) => {
    return {
      name: nome,
      item: item,
      verso: true,
      imgSrc: `/images/cards/${item}/1.png`,
      styleSrc: (context.backgroundCard === item || !user.decksPermitidos.includes(item)) ? 
      { opacity: '50%' } : {},
      onClick: () => context.setBackgroundCard(item),
      children: (!user.decksPermitidos.includes(item) ? <FaLock style={{ fontSize: '2rem', color: 'white' }} /> : 
                (context.backgroundCard === item ? <FaRegEye style={{ fontSize: '2rem', color: 'white' }} /> : null))
    };
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <MenuNavbar>
        <h1>
          <img src="/images/favicon.png" alt="Logo" /> Loja <img src="/images/favicon.png" alt="Logo" />
        </h1>
      </MenuNavbar>
      <div id="fundo">
        <GroupCard 
          className="decks-container-full"
          name="Decks"
          itens={[
            renderCardProps('default', 'Padrão'),
            renderCardProps('alice', 'Alice'),
            renderCardProps('animais', 'Animais'),
            renderCardProps('criaturas', 'Criaturas'),
            renderCardProps('heroes', 'Pokemón'),
            renderCardProps('pokemon', 'Animais'),
            renderCardProps('folclore', 'Folclore'),
            renderCardProps('natal', 'Natal'),
            renderCardProps('halloween', 'Halloween'),
            renderCardProps('halloween2', 'Halloween ')
          ]}
        />
        <div className="containerCentral">
          <GroupCard 
            classNameDeck="imagemMenor" 
            name="Planos de Fundo" 
            itens={[
              { name: 'Natureza', imgSrc: '/images/natureza.png', onClick: () => context.setBackground('/images/natureza.png') },
              { name: 'Deserto', imgSrc: '/images/deserto.png', onClick: () => context.setBackground('/images/deserto.png') },
              { name: 'Mata', imgSrc: '/images/fundoRegras.png', onClick: () => context.setBackground('/images/fundoRegras.png') },
              // Adicione outros itens conforme necessário
            ]}
          />
          <GroupCard 
            classNameDeck="imagemMenor" 
            name="Músicas" 
            itens={[
              { name: 'Item 1', imgSrc: '/images/audio_icon.png' },
              { name: 'Item 2', imgSrc: '/images/audio_icon.png' },
              // Adicione outros itens conforme necessário
            ]}
          />
        </div>
      </div>
    </div>
  );
}
