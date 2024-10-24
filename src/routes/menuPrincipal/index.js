import { Link, useNavigate, useOutletContext } from "react-router-dom";
import './index.css'; 
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import Menu from "../../components/Menu";
import Rodape from "../../components/Rodape";

export default function MenuPrincipal() {
    const { user } = useContext(AuthContext); 
    const context = useOutletContext();
    const webSocket = context.webSocket;
    const navigate = useNavigate();

    return (
        <div>
            <Menu />
            <nav className="navbar">
                <div className="logo">
                    <h1>KARIBA: VIRTUAL</h1>
                </div>
            </nav>
            <header className="header">
                <div className="headline">
                    <div className="rounded-pill bg-secondary">
                        <h2>BEM VINDO, {user.username?.toUpperCase()}!
                            <br/>
                        VOCÊ ACHOU O MELHOR 
                        <br/> JOGO DE CARTAS</h2>
                    </div>
                    <p className="text-center">O objetivo em Kariba é coletar o maior número possível de cartas. Cada animal tem um número que corresponde ao seu poder na Savana.</p>
                </div>
                <div className="imgheadline">
                    <Link className="botao" onClick={() => {
                        debugger;
                        webSocket.open();
                    }} to="/aguardando">Jogar</Link>
                    <Link className="botao" to="/store">Loja</Link>
                    <Link className="botao" to="/regras">Regras</Link>
                    <Link className="botao" to="/sobre">Sobre nós</Link>
                </div>
            </header>
            <Rodape />
        </div>
    );
}