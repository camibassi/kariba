import './index.css'
import MenuNavbar from "../../components/menuNavbar";
import { Container } from 'react-bootstrap';

export default function Regras()
{
    return(
    <div id="regras">
        <MenuNavbar>
            <h1>
                <img src="/images/favicon.png" alt="Logo" /> Como jogar o Kariba? <img src="/images/favicon.png" alt="Logo" />
            </h1>
        </MenuNavbar>
        <Container fluid>
            <section>
                <img src="images/objetivo.png"></img>
                <p>O objetivo de <strong>Kariba</strong> é capturar o maior número de cartas de animais. Os jogadores colocam animais próximos ao lago e usam a força de uns para afugentar os outros.</p>
            </section>

            <section>
                <img src="images/preparacao.png"></img>
                <ul>
                    <li>5 cartas são distribuidas para cada jogador.</li>
                    <li>O restante das cartas forma o monte de compras.</li>
                    <li>O tabuleiro circular com divisões numéricas de 1 a 8 é colocado no centro da mesa.</li>
                </ul>
            </section>
            
            <section>
                <img src="images/comoJogar.png"></img>
                <ol>
                    <li>No seu turno, o jogador deve colocar uma ou mais cartas do mesmo tipo de animal em sua respectiva posição numérica no tabuleiro.</li>
                    <li>Se, após a jogada, houver 3 ou mais cartas do mesmo animal em um número, ele afugenta os animais numericamente mais fracos (adjacentes). Exemplo: 3 ou mais elefantes (8) afugentam os rinocerontes (7).</li>
                    <li>Os animais afugentados são capturados pelo jogador que fez a jogada e guardados como pontos.</li>
                    <li>Após a jogada, o jogador compra cartas do monte até completar 5 cartas em sua mão.</li>
                </ol>
            </section>

            <section>
                <img src="images/cartas.png"></img>
                <p>Cada animal tem um número que representa sua posição no tabuleiro:</p>
                <img id="cartas" src="images/cartaskariba.png"></img>  
            </section>

            <section>
                <img src="images/excecao.png"></img>
                <p>Os ratos (número 1) são os únicos que podem afugentar os elefantes (número 8). Para isso, é necessário ter 3 ou mais ratos no tabuleiro.</p>
            </section>

            <section>
                <img src="images/fimdojogo.png"></img>
                <p>O jogo termina quando todas as cartas do baralho foram jogadas e não restam mais cartas na mão dos jogadores.</p>
            </section>

            <section>
                <img src="images/vencedor.png"></img>
                <p>O vencedor é o jogador que capturou o maior número de cartas ao final do jogo.</p>
            </section>

            <footer>
                <p>Divirta-se jogando Kariba!</p>
            </footer>
        </Container>
    </div>
    );

}