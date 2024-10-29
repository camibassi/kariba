import "../store/index.css";
import GroupCard from "../../components/GroupCard";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import MenuNavbar from "../../components/MenuNavbar";
import { FaLock, FaRegEye } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Store() {
  const { user } = useContext(AuthContext);
  const context = useOutletContext();
  const renderCardProps = (item, nome) => {
    return {
      name: nome,
      item: item,
      verso: true,
      imgSrc: `/images/cards/${item}/1.png`,
      styleSrc: (context.backgroundCard === item || !user.permissoes?.deck.includes(item)) ? 
      { opacity: '50%' } : {},
      onClick: () => context.setBackgroundCard(item),
      children: (!user.permissoes?.deck.includes(item) ? <FaLock style={{ fontSize: '2rem', color: 'white' }} /> : 
                (context.backgroundCard === item ? <FaRegEye style={{ fontSize: '2rem', color: 'white' }} /> : null))
    };
  };

  const renderBackgroundProps = (item, nome) => {
    return {
      name: nome,
      item: item,
      imgSrc: `/images/${item}.png`,
      styleSrc: (context.background === item || !user.permissoes?.background.includes(item)) ? 
      { opacity: '50%' } : {},
      onClick: () => context.setBackground(`/images/${item}.png`),
      children: (!user.permissoes?.background.includes(item) ? <FaLock style={{ fontSize: '2rem', color: 'white' }} /> : 
                (context.background === `/images/${item}.png` ? <FaRegEye style={{ fontSize: '2rem', color: 'white' }} /> : null))
    };
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <MenuNavbar>
        <h1>
          <img src="/images/favicon.png" alt="Logo" /> Loja <img src="/images/favicon.png" alt="Logo" />
        </h1>
        <Link className="icone" to="/user"><img src="images/icone50.png"/></Link>

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
            renderCardProps('heroes', 'Heróis'),
            renderCardProps('pokemon', 'Pokemon'),
            renderCardProps('folclore', 'Folclore'),
            renderCardProps('natal', 'Natal'),
            renderCardProps('halloween', 'Halloween'),
            renderCardProps('halloween2', 'Halloween ')
          ]}
        />
        <div className="containerCentral">
          <GroupCard classNameDeck="imagemMenor" name="Planos de Fundo" itens={[
            renderBackgroundProps('natureza', 'Natureza'),
            renderBackgroundProps('natureza3', 'Natureza (2)'),
            renderBackgroundProps('deserto', 'Deserto'),
            renderBackgroundProps('fundoRegras', 'Mata'),
            renderBackgroundProps('heroes', 'Heróis'),
            renderBackgroundProps('halloween', 'Halloween'),
            renderBackgroundProps('natal', 'Natal'),
            renderBackgroundProps('natal2', 'Natal (2)')
            ]}  />
          <GroupCard classNameDeck="imagemMenorAcoes" name="Ações" itens={[
            {name: 'Carta coringa', imgSrc: 'images/9.png'},
            {name: 'Trombeta', imgSrc: 'images/perfil.png'},
            {name: 'Item 3', imgSrc: ''},
            {name: 'Item 4', imgSrc: ''},
          ]}  />
        </div>
      </div>
    </div>
  );
}
