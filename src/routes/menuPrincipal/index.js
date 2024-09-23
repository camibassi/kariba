import { Link } from "react-router-dom";
import '../../routes/menuPrincipal/menuPrincipal.css'; // Certifique-se de que o caminho está correto

export default function MenuPrincipal() {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <h1>KARIBA: VIRTUAL</h1>
                </div>
            </nav>
            <header className="header">
                <div className="headline">
                    <h2>VOCÊ ACHOU O MELHOR</h2>
                    <h2>JOGO DE CARTAS</h2>
                    <p>O objetivo em Kariba é coletar o maior número possível de cartas. Cada animal tem um número que corresponde ao seu poder na Savana.</p>
                </div>
                <div className="imgheadline">
                    <Link className="botao" to="/game">Jogar</Link>
                    <Link className="botao" to="/store">Loja</Link>
                    <Link className="botao" to="/regras">Regras</Link>
                    <Link className="botao" to="/sobre">Sobre nós</Link>
                </div>
            </header>
        </div>
    );
}
