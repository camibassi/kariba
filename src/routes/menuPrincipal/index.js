import { FormatEmail } from "../../utils/format";
import '../../routes/menuPrincipal/menuPrincipal.css'
import { Link, useNavigate } from "react-router-dom";

export default function menuPrincipal()
{
    return(
        <div>
            <nav class="navbar">
                 <div class="logo">
                    <h1>KARIBA: VIRTUAL</h1>
                 </div>
            </nav>
            <header class="header">
                <div class="headline">
                    <h2>VOCÊ ACHOU O MELHOR</h2>
                    <h2>JOGO DE CARTAS</h2>
                    <p>O objetivo em Kariba é coletar o maior número possível de cartas. Cada animal tem um numero que corresponde ao seu poder na Savana.</p>
                </div>
                <div class="imgheadline">
                    <Link id="botao" to="/game">Jogar</Link>
                    <Link id="botao" to="/store" >Loja</Link>
                    <Link id="botao" to="/regras">Regras</Link>
                    <Link id="botao" to="/sobre" >Sobre nós</Link>
                </div>
            </header>
        </div>
       
        );
}