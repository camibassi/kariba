import "../store/index.css";
import GroupCard from "../../components/GroupCard";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../components/AuthContext";
import { FaCoins, FaLock, FaRegEye } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import useRequest from "../../hooks/useRequest";
import Rodape from "../../components/Rodape";
import { Container, Navbar } from 'react-bootstrap';

export default function Store() {
  const { user } = useContext(AuthContext);
  const context = useOutletContext();
  const [selectedItem, setSelectedItem] = useState(null);
  const toast = useRef(null); 
  const request = useRequest(user);
  const { login } = useContext(AuthContext); 

  const showConfirm = (item, origem) => {
    if (user.saldo < 50) {
      toast.current.show({
        severity: "error",
        summary: "Saldo Insuficiente",
        detail: `Você possui ${user.saldo} moedas, mas o item custa 50 moedas.`,
        life: 3000,
      });
      return;
    }
    setSelectedItem(item);
    confirmDialog({
      message: (
        <>
          Você possui {user.saldo} <FaCoins />. Deseja realmente comprar o item {item} por 50 <FaCoins />?
        </>
      ),
      header: "Confirmação de Compra",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => handlePurchase(item, origem),
    });
  };

  const handlePurchase = (item, permissao) => {

    let permissoes = structuredClone(user.permissoes);

    if(user.permissoes[permissao]?.length)
      permissoes[permissao].push(item);

    request.sendRequest({
      url: 'user',
      method: 'PUT',
      body: {...user, ... {
          saldo: user.saldo - 50,
          permissoes: permissoes
        }},
    }, (response) => {
      request.sendRequest({
        url:  `user?username=${user.username}&password=${user.password}`,
      }, (objUser) => {
        login(objUser.details);
      });

      toast.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: `Você comprou o item ${item} por 50 moedas!`,
        life: 3000,
      });
    })
  };

  const renderCardProps = (item, nome) => {
    const isLocked = !user.permissoes?.deck.includes(item);
    return {
      name: nome,
      item: item,
      verso: true,
      imgSrc: `/images/cards/${item}/1.png`,
      styleSrc: (context.backgroundCard === item || isLocked) ? { opacity: "50%" } : {},
      onClick: () => isLocked ? showConfirm(item, 'deck') : context.setBackgroundCard(item),
      children: isLocked ? (
        <FaLock style={{ fontSize: "2rem", color: "white" }} />
      ) : (
        context.backgroundCard === item && <FaRegEye style={{ fontSize: "2rem", color: "white" }} />
      ),
    };
  };

  const renderBackgroundProps = (item, nome) => {
    const isLocked = !user.permissoes?.background.includes(item);
    return {
      name: nome,
      item: item,
      imgSrc: `/images/${item}.png`,
      styleSrc: (context.background === item || isLocked) ? { opacity: "50%" } : {},
      onClick: () => isLocked ? showConfirm(item, 'background') : context.setBackground(`/images/${item}.png`),
      children: isLocked ? (
        <FaLock style={{ fontSize: "2rem", color: "white" }} />
      ) : (
        context.background === `/images/${item}.png` && <FaRegEye style={{ fontSize: "2rem", color: "white" }} />
      ),
    };
  };


  return (
    <div style={{ overflow: "hidden" }}>
      <Toast ref={toast} position="center" />
      <ConfirmDialog />
      <Navbar className="navbar-store">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/menu">Menu</Navbar.Brand>
          <div className="nameuser">
            {user.nome?.toUpperCase() || user.username?.toUpperCase()}
          </div>
            <Link className="icone" to="/user">
              <img src="images/icone50.png" alt="Ícone do usuário" />
            </Link>
        </Container>
      </Navbar>
      <div id="fundo">
        <GroupCard
          className="decks-container-full"
          name="Decks (Unidade: R$ 50,00)"
          itens={[
            renderCardProps("default", "Padrão"),
            renderCardProps("alice", "Alice"),
            renderCardProps("animais", "Animais"),
            renderCardProps("criaturas", "Criaturas"),
            renderCardProps("heroes", "Heróis"),
            renderCardProps("pokemon", "Pokemon"),
            renderCardProps("folclore", "Folclore"),
            renderCardProps("natal", "Natal"),
            renderCardProps("halloween", "Halloween"),
            renderCardProps("halloween2", "Halloween (2)"),
          ]}
        />
        <div className="containerCentral">
          <GroupCard
            classNameDeck="imagemMenor"
            name="Planos de Fundo (Unidade: R$ 50,00)"
            itens={[
              renderBackgroundProps("natureza", "Padrão"),
              renderBackgroundProps("alice", "Alice"),
              renderBackgroundProps("animais", "Animais"),
              renderBackgroundProps("criaturas", "Criaturas"),
              renderBackgroundProps("heroes", "Heróis"),
              renderBackgroundProps("pokemon1", "Pokémon"),
              renderBackgroundProps("folclore", "Folclore"),
              renderBackgroundProps("natal", "Natal"),
              renderBackgroundProps("halloween", "Halloween"),
              renderBackgroundProps("halloween2", "Halloween (2)"),

            ]}
          />
        </div>
      </div>
    </div>
  );
}
