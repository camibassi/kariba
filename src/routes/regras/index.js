import './index.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Regras() {
    return (
        <div id="regras">
            <Navbar className="navbar-regras">
                <Container className="d-flex justify-content-between">
                    <Navbar.Brand as={Link} to="/menu">Menu</Navbar.Brand>
                    <Link className="icone" to="/user">
                        <img src="images/icone50.png" alt="Ícone do usuário" />
                    </Link>
                </Container>
            </Navbar>

            <Container fluid>
                <section>
                    <img src="images/objetivo.png" alt="Objetivo do jogo" />
                    <p>O objetivo de <strong>Kariba</strong> é capturar o maior número de cartas de animais. Os jogadores colocam animais próximos ao lago e usam a força de uns para afugentar os outros.</p>
                </section>

                <section>
                    <img src="images/preparacao.png" alt="Preparação do jogo" />
                    <ul>
                        <li>5 cartas são distribuidas para cada jogador.</li>
                        <li>O restante das cartas forma o monte de compras.</li>
                        <li>A lagoa no centro da tela será utilizada para posicionar as cartas</li>
                    </ul>
                </section>

                <section>
                    <img src="images/comoJogar.png" alt="Como jogar" />
                    <ol>
                        <li>No seu turno, o jogador deve colocar uma ou mais cartas do mesmo tipo de animal em sua respectiva posição numérica no tabuleiro.</li>
                        <li>Se, após a jogada, houver 3 ou mais cartas do mesmo animal em um número, ele afugenta os animais numericamente mais fracos (adjacentes). Exemplo: 3 ou mais elefantes (8) afugentam os rinocerontes (7).</li>
                        <li>Os animais afugentados são capturados pelo jogador que fez a jogada e guardados como pontos.</li>
                        <li>Após a jogada, o jogador compra cartas do monte até completar 5 cartas em sua mão.</li>
                    </ol>
                </section>

                <section>
                    <img src="images/cartas.png" alt="Cartas do jogo" />
                    <p>Cada animal tem um número que representa sua posição no tabuleiro:</p>
                    <img id="cartas" src="images/cartaskariba.png" alt="Cartas do Kariba" />
                </section>

                <section>
                    <img src="images/excecao.png" alt="Exceção" />
                    <p>Os ratos (número 1) são os únicos que podem afugentar os elefantes (número 8). Para isso, é necessário ter 3 ou mais ratos no tabuleiro.</p>
                </section>

                <section>
                    <img src="images/fimdojogo.png" alt="Fim do jogo" />
                    <p>O jogo termina quando todas as cartas do baralho foram jogadas e não restam mais cartas na mão dos jogadores.</p>
                </section>

                <section>
                    <img src="images/vencedor.png" alt="Vencedor" />
                    <p>O vencedor é o jogador que mais coletou pontos ao final do jogo.</p>
                </section>

                <footer>
                    <p>Divirta-se jogando Kariba!</p>
                </footer>
            </Container>
        </div>
    );
}
