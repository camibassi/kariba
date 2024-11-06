import { Container, Nav, Navbar } from "react-bootstrap";
import { FaReply } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";
import './styles/menuNavbar.css'; // Estilos adicionais
import { Dialog } from "primereact/dialog";
import { useState } from "react";

const MenuNavbar = (props) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false); // Controle da caixa de diálogo de seleção de modo

  function voltar_menu(){
      navigate('../menu');
  }

  async function confirmaSaida(resposta) {
    if (resposta === "sim") {
        setShowDialog(false);
        props.finalizaPartida();
    } else if (resposta === "não") {
        //verificar como bloquear o modo normal do outro jogador
        setShowDialog(false);
    }
}
  return (
    <>
      <Navbar className={"styled-navbar w-100" + props.className || ""} style={{zIndex: '1', height: '45px'}}>
        <Container>
          <Navbar.Brand className="navbar-brand">Kariba</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" 
            onClick={() => {
              if (props.exibirDialogo) {
                setShowDialog(true); // Exibir caixa de diálogo na tela específica
              } else {
                navigate('../menu'); // Navegar diretamente para o menu nas outras telas
              }
            }}>
              <FaReply className="navbar-icon" /> Menu
            </Nav.Link>
          </Nav>
          <div className="custom-content">
          {props.children}
          </div>
        </Container>
      </Navbar>
      {/* Caixa de diálogo com opções de modo */}
      <Dialog
      visible={showDialog}
      onHide={() => setShowDialog(false)}
      header="Você realmente quer sair do jogo?"
      >
          <div className="dialog-content">
              <img src="images/sad.png"/>
              <button className="dialog-button" onClick={() => confirmaSaida('sim')}>Sim</button>
              <button className="dialog-button" onClick={() => confirmaSaida('não')}>Não</button>
          </div>
      </Dialog>
      <Outlet />
    </>
  );
};

export default MenuNavbar;
