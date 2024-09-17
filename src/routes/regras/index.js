import { FormatEmail } from "../../utils/format";
import '../../routes/regras/regras.css'
import { Link, useNavigate } from "react-router-dom";

export default function Regras()
{
    return(
        <body>
        <h1>Como jogar o Kariba?</h1>
            <div class="scroll-container">
            <div class="container">
                <section>
                    <h2>Objetivo do Jogo</h2>
                    <p>O objetivo de <strong>Kariba</strong> é capturar o maior número de cartas de animais. Os jogadores colocam animais próximos ao lago e usam a força de uns para afugentar os outros.</p>
                </section>

                <section>
                    <h2>Preparação</h2>
                    <ul>
                        <li>Embaralhe o baralho de animais.</li>
                        <li>Distribua 5 cartas para cada jogador.</li>
                        <li>O restante das cartas forma o monte de compras.</li>
                        <li>O tabuleiro circular com divisões numéricas de 1 a 8 é colocado no centro da mesa.</li>
                    </ul>
                </section>

                <section>
                    <h2>Como Jogar</h2>
                    <ol>
                        <li>No seu turno, o jogador deve colocar uma ou mais cartas do mesmo tipo de animal em sua respectiva posição numérica no tabuleiro.</li>
                        <li>Se, após a jogada, houver 3 ou mais cartas do mesmo animal em um número, ele afugenta os animais numericamente mais fracos (adjacentes). Exemplo: 3 ou mais elefantes (8) afugentam os rinocerontes (7).</li>
                        <li>Os animais afugentados são capturados pelo jogador que fez a jogada e guardados como pontos.</li>
                        <li>Após a jogada, o jogador compra cartas do monte até completar 5 cartas em sua mão.</li>
                    </ol>
                </section>

                <section>
                    <h2>Animais e seus Números</h2>
                    <p>Cada animal tem um número que representa sua posição no tabuleiro:</p>
                    <ul>
                        <li>1. Rato</li>
                        <li>2. Suricato</li>
                        <li>3. Coelho</li>
                        <li>4. Javali</li>
                        <li>5. Zebra</li>
                        <li>6. Girafa</li>
                        <li>7. Rinoceronte</li>
                        <li>8. Elefante</li>
                    </ul>
                </section>

                <section>
                    <h2>Exceção</h2>
                    <p>Os ratos (número 1) são os únicos que podem afugentar os elefantes (número 8). Para isso, é necessário ter 3 ou mais ratos no tabuleiro.</p>
                </section>

                <section>
                    <h2>Fim do Jogo</h2>
                    <p>O jogo termina quando todas as cartas do baralho foram jogadas e não restam mais cartas na mão dos jogadores.</p>
                </section>

                <section>
                    <h2>Vencedor</h2>
                    <p>O vencedor é o jogador que capturou o maior número de cartas ao final do jogo.</p>
                </section>

                <footer>
                    <p>Divirta-se jogando Kariba!</p>
                </footer>
                </div>
            </div>
    </body>

    );

}