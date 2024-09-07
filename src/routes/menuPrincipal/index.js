import { FormatEmail } from "../../utils/format";
import '../../routes/menuPrincipal/menuPrincipal.css'

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
                    <a id="botao" href="#Regras">Regras</a>
                    <a id="botao" href="##Player-vs-Player">Player-vs-Player</a>
                    <a id="botao" href="#Player-vs-PC">Player-vs-PC</a>
                    <a id="botao" href="Loja">Loja</a>
                    <a id="botao" href="Sobre-nos">Sobre Nós</a>
                </div>
            </header>
        </div>
       
        );
}