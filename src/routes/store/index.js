import "../store/index.css";
import GroupCard from "../../components/GroupCard";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../components/AuthContext";
import MenuNavbar from "../../components/MenuNavbar";
import { FaCoins, FaLock, FaRegEye } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import useRequest from "../../hooks/useRequest";
import createJsonPatch from "../../utils/createJsonPatch";

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
      <MenuNavbar>
        <h1>
          <img src="/images/favicon.png" alt="Logo" /> Loja <img src="/images/favicon.png" alt="Logo" />
        </h1>
        <Link className="icone" to="/user">
          <img src="images/icone50.png" />
        </Link>
      </MenuNavbar>
      <div id="fundo">
        <GroupCard
          className="decks-container-full"
          name="Decks"
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
            name="Planos de Fundo"
            itens={[
              renderBackgroundProps("natureza", "Natureza"),
              renderBackgroundProps("natureza3", "Natureza (2)"),
              renderBackgroundProps("deserto", "Deserto"),
              renderBackgroundProps("fundoRegras", "Mata"),
              renderBackgroundProps("heroes", "Heróis"),
              renderBackgroundProps("halloween", "Halloween"),
              renderBackgroundProps("natal", "Natal"),
              renderBackgroundProps("natal2", "Natal (2)"),
            ]}
          />
          <GroupCard
            classNameDeck="imagemMenorAcoes"
            name="Ações"
            itens={[
              { name: "Carta coringa", imgSrc: "images/9.png" },
              { name: "Trombeta", imgSrc: "images/perfil.png" },
              { name: "Item 3", imgSrc: "" },
              { name: "Item 4", imgSrc: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
