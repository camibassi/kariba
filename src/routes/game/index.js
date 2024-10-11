import Deck from "../../components/Deck";
import Lagoa from "../../components/Lagoa";
import Mao from "../../components/Mao";
import Placar from "../../components/Placar";
import Contador from "../../components/Contador";
import useBoard from "../../hooks/useBoard";
import UseCartasMao from "../../hooks/useCartasMao";
import MenuNavbar from "../../components/MenuNavbar";
import CartasAdversario from "../../components/CartasAdversario";
import useShowHide from "../../hooks/useShowHide";
import useWebSocket from "../../hooks/useWebSocket"; // Hook useWebSocket
import useRequest from "../../hooks/useRequest"; // Hook useRequest

import "../game/index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game() {
    const board = useBoard();
    const visivel = useShowHide();
    const [mostrarContador, setMostrarContador] = useState(false);
    const cartasMao = UseCartasMao({ setContador: setMostrarContador });
    const [meuPlacar, setMeuPlacar] = useState(0);
    const [placarAdversario, setPlacarAdversario] = useState(0); // Futuramente virá do backend.
    const [cartasGuardadas, setMinhasCartasGuardadas] = useState(0);

    // Usando o hook useWebSocket
    const { messages, sendMessage, closeSocket, gameState, isConnected } = useWebSocket("wss://1na5t5v281.execute-api.sa-east-1.amazonaws.com/dev");

    // Usando o hook useRequest para realizar requisições HTTP
    const { data, loading, error, sendRequest } = useRequest();

    const navigate = useNavigate();

    // Função que inicia a partida
    async function iniciaPartida() {
        sendMessage("Iniciar partida");
        visivel.apareceCarta();
        cartasMao.adicionarCarta();
        cartasMao.adicionarCarta();
        setMostrarContador(true); // Exibe o contador ao iniciar a partida
    }

    // Função que finaliza a partida
    async function finalizaPartida() {
        sendMessage("Finalizar partida");
        closeSocket(); // Fecha a conexão WebSocket
        navigate("/");
    }

    // Efeito que realiza a requisição quando a conexão WebSocket é estabelecida (isConnected === true)
    useEffect(() => {
        if (isConnected) {
            sendRequest(
                {
                    url: '/iniciarPartida', 
                    method: 'POST',
                },
                (response) => {
                    console.log('Dados recebidos:', response);
                    // Lógica para manipular a resposta da API, se necessário
                }
            );
        }
    }, [isConnected, sendRequest]);

    // Efeito para monitorar mudanças no estado do jogo (gameState)
    useEffect(() => {
        if (gameState) {
            // Lógica para atualizar o placar ou o estado visual do jogo com base em gameState
            console.log("Estado do jogo atualizado: ", gameState);
        }
    }, [gameState]); // Executa quando o gameState muda

    return (
        <div className="overflow-hidden">
            <MenuNavbar>
                <h1>
                    <img src="/images/favicon.png" alt="Logo" /> Kariba <img src="/images/favicon.png" alt="Logo" />
                </h1>
            </MenuNavbar>
            <div className="position-relative" style={{ height: '92vh' }}>

                <Lagoa board={board}
                    cartas={cartasMao}
                    guardarCartas={(numero) => {
                        setMinhasCartasGuardadas(cartasGuardadas + numero);
                        setMeuPlacar(meuPlacar + 1);
                    }} />

                <div id="botoes">
                    <button onClick={iniciaPartida}
                        style={{ display: visivel.status === true ? "none" : "block" }}> Iniciar </button>
                </div>

                {/* Exibe o Contador condicionalmente */}
                {mostrarContador && <Contador />}

                <Deck cartas={cartasMao} visibilidade={visivel} />
                <Placar meuPlacar={meuPlacar} adversario={placarAdversario} />
                <Mao cartas={cartasMao} board={board} />
                <CartasAdversario visibilidade={visivel} />
            </div>

            {/* Exibe loading e erros da requisição */}
            {loading && <p>Carregando dados...</p>}
            {error && <p>Erro ao carregar dados: {error.message}</p>}
        </div>
    );
}
