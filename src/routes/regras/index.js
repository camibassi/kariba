import './index.css'
import MenuNavbar from "../../components/menuNavbar";

export default function Regras()
{
    return(
<>
    <MenuNavbar>
        <h1>
            <img src="/images/favicon.png" alt="Logo" /> Como jogar o Kariba? <img src="/images/favicon.png" alt="Logo" />
        </h1>

      </MenuNavbar>
        <section>
            <h2 id="regras">Objetivo do Jogo</h2>
            <p>O objetivo de <strong>Kariba</strong> é capturar o maior número de cartas de animais. Os jogadores colocam animais próximos ao lago e usam a força de uns para afugentar os outros.</p>
            <img src="images/divisor.png"></img>
        </section>

        <section>
            <h2 id="regras">Preparação</h2>
            <ul>
                <li>5 cartas são distribuidas para cada jogador.</li>
                <li>O restante das cartas forma o monte de compras.</li>
                <li>O tabuleiro circular com divisões numéricas de 1 a 8 é colocado no centro da mesa.</li>
            </ul>
            <img src="images/divisor.png"></img>
        </section>
        
        <section>
            <h2 id="regras">Como Jogar</h2>
            <ol>
                <li>No seu turno, o jogador deve colocar uma ou mais cartas do mesmo tipo de animal em sua respectiva posição numérica no tabuleiro.</li>
                <li>Se, após a jogada, houver 3 ou mais cartas do mesmo animal em um número, ele afugenta os animais numericamente mais fracos (adjacentes). Exemplo: 3 ou mais elefantes (8) afugentam os rinocerontes (7).</li>
                <li>Os animais afugentados são capturados pelo jogador que fez a jogada e guardados como pontos.</li>
                <li>Após a jogada, o jogador compra cartas do monte até completar 5 cartas em sua mão.</li>
            </ol>
            <img src="images/divisor.png"></img>
        </section>

        <section>
            <h2 id="regras">Animais e seus Números</h2>
            <p>Cada animal tem um número que representa sua posição no tabuleiro:</p>
                <li>1 - Rato</li>
                <li>2 - Suricato</li>
                <li>3 - zebra</li>
                <li>4 - Girafa</li>
                <li>5 - Avestruz</li>
                <li>6 - Leopardo</li>
                <li>7 - Rinoceronte</li>
                <li>8 - Elefante</li>
                <img src="images/divisor.png"></img>
        </section>

        <section>
            <h2 id="regras">Exceção</h2>
            <p>Os ratos (número 1) são os únicos que podem afugentar os elefantes (número 8). Para isso, é necessário ter 3 ou mais ratos no tabuleiro.</p>
            <img src="images/divisor.png"></img>
        </section>

        <section>
            <h2 id="regras">Fim do Jogo</h2>
            <p>O jogo termina quando todas as cartas do baralho foram jogadas e não restam mais cartas na mão dos jogadores.</p>
            <img src="images/divisor.png"></img>
        </section>

        <section>
            <h2 id="regras">Vencedor</h2>
            <p>O vencedor é o jogador que capturou o maior número de cartas ao final do jogo.</p>
            <img src="images/divisor.png"></img>
        </section>

        <footer>
            <p>Divirta-se jogando Kariba!</p>
        </footer>
    
           
    </>
    );

}