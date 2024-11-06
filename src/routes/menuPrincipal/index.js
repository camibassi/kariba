import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaSignOutAlt } from "react-icons/fa"; // Ícone de logout
import './index.css'; 
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import Rodape from "../../components/Rodape";
import { useRef } from "react";

export default function MenuPrincipal() {
    const { user, logout } = useContext(AuthContext);
    const context = useOutletContext();
    const webSocket = context.webSocket;
    const navigate = useNavigate();
    const containerRef = useRef(null);

    // Função para realizar o logout e redirecionar para a página inicial
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Extrai o primeiro nome do usuário
    const primeiroNome = user.nome ? user.nome.split(" ")[0].toUpperCase() : user.username?.split(" ")[0].toUpperCase();

    return (
        <div className="tela-jogo" ref={containerRef}> {/* Novo contêiner para o background */}
            <Navbar className="navbar-menu">
                <Container className="d-flex justify-content-between">
                    <Nav.Link className="navbar-link" onClick={handleLogout}>
                        <FaSignOutAlt className="navbar-icon" /> Sair
                    </Nav.Link>
                    
                    <div className="d-flex align-items-center">
                        <div className="nameuser">
                            {user.nome?.toUpperCase() || user.username?.toUpperCase()}
                        </div>
                        <Link className="icone" to="/user">
                            <img src="images/icone50.png" alt="Ícone do usuário" />
                        </Link>
                    </div>
                </Container>
            </Navbar>      

            {/* Contêiner para centralizar a imagem do logo */}
            <div className="logo-container">
                <img className="logonovo" src="images/novologo.png" alt="logo" />
            </div>
            
            <header className="header">
                <div className="headline">
                    <div className="placa">
                        <h2><br/>BEM VINDO, {primeiroNome}!
                            <br/>
                            VOCÊ ACHOU O MELHOR 
                            <br/> JOGO DE CARTAS
                        </h2>
                        <p className="text-center texto-movimento-continuo">
                            O objetivo em Kariba é coletar <br/>o maior número possível de cartas. <br/>Cada animal tem um número <br/>que corresponde <br/>ao seu poder na Savana.
                        </p>
                    </div>
                </div>
                
                <div className="imgheadline">
                    <Link className="botao" onClick={() => {
                        webSocket.open();
                    }} to="/aguardando">Jogar</Link>
                    <Link className="botao" to="/store">Loja</Link>
                    <Link className="botao" to="/regras">Regras</Link>
                    <Link className="botao" to="/sobre">Sobre nós</Link>
                </div>
            </header>
            <Rodape targetRef={containerRef}/>
        </div>
    );
}
