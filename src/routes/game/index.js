import Deck from "../../components/Deck";
import Lagoa from "../../components/Lagoa";
import Mao from "../../components/Mao";
import Placar from "../../components/Placar";
import Contador from "../../components/Contador";
import useBoard from "../../hooks/useBoard";

import "../game/index.css";
import UseCartasMao from "../../hooks/useCartasMao";
import useShowHide from "../../hooks/useShowHide";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuNavbar from "../../components/MenuNavbar";
import CartasAdversario from "../../components/CartasAdversario";

export default function Game() {
    const board = useBoard();
    const visivel = useShowHide();
    const [mostrarContador, setMostrarContador] = useState(false);
    const cartasMao = UseCartasMao({setContador: setMostrarContador});
    const [meuPlacar, setMeuPlacar] = useState(0);
    const [placarAdversario, setPlacarAdversario] = useState(0); // Futuramente virá do backend.
    const [cartasGuardadas, setMinhasCartasGuardadas] = useState(0);

    // Função que inicia a partida
    async function iniciaPartida() {
        visivel.apareceCarta();
        cartasMao.adicionarCarta();
        cartasMao.adicionarCarta();
        setMostrarContador(true); // Exibe o contador ao iniciar a partida
    }

    const [socket, setSocket] = useState(null);
    const [messageToSend, setMessageToSend] = useState("");
    const [gameState, setGameState] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    async function iniciaPartida() {
        try {
            const ws = new WebSocket("wss://1na5t5v281.execute-api.sa-east-1.amazonaws.com/dev");
            setSocket(ws);

            ws.onopen = (event) => {
                console.log("Conectado ao WebSocket", event);
                visivel.apareceCarta();
                cartasMao.adicionarCarta();
                cartasMao.adicionarCarta();
                setMostrarContador(true); // Exibe o contador ao iniciar a partida
            };

            ws.onmessage = (event) => {
                console.log("Mensagem recebida: ", event.data);
                const data = JSON.parse(event.data);
                if (data.action === 'updateGameState') {
                    setGameState(data.gameState);
                }
            };

            ws.onclose = (event) => {
                console.log("WebSocket fechado: ", event);
            };

            ws.onerror = (error) => {
                console.error("Erro no WebSocket: ", error);
            };

        } catch (error) {
            console.error("Erro ao iniciar a partida: ", error);
        }
    }

    async function finalizaPartida() {
        if (socket) {
            socket.close();
            setSocket(null);
            console.log("Desconectado do WebSocket");
            navigate("/");
        }
    }

    return (
        <div className="overflow-hidden">
        <MenuNavbar>
                <h1>
                    <img src="/images/favicon.png" alt="Logo" /> Kariba <img src="/images/favicon.png" alt="Logo" />
                </h1>
        </MenuNavbar>
        <div className="position-relative" style={{height: '92vh'}}>
            
            <Lagoa board={board} 
                cartas={cartasMao} 
                guardarCartas={(numero) => {
                    setMinhasCartasGuardadas(cartasGuardadas + numero);
                    setMeuPlacar(meuPlacar + 1);
                }}/>

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
        </div>
    );
}