import Deck from "../../components/deck";
import Lagoa from "../../components/lagoa";
import Mao from "../../components/mao";
import Placar from "../../components/placar";
import Adversario from "../../components/adversario";
import Contador from "../../hooks/contador_mensagem"; // Importando o Contador
import useBoard from "../../hooks/useBoard";

import "../game/index.css";
import UseCartasMao from "../../hooks/UseCartasMao";
import useShowHide from "../../hooks/showHide";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game() {
    const cartasMao = UseCartasMao();
    const board = useBoard();
    const visivel = useShowHide();
    const [mostrarContador, setMostrarContador] = useState(false); // Estado para exibir o Contador

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
        <div>
            <Lagoa board={board}/>

            <div id="botoes">
                <button onClick={iniciaPartida}
                    style={{ display: visivel.status === true ? "none" : "block" }}> Iniciar </button>
            </div>

            {/* Exibe o Contador condicionalmente */}
            {mostrarContador && <Contador />} 

            <Deck cartas={cartasMao} visibilidade={visivel} />
            <Placar />
            <Mao cartas={cartasMao} board={board} />
            <Adversario visibilidade={visivel} />
        </div>
    );
}

/*<button onClick={finalizaPartida} 
style={{ display: visivel.status === false ? "none" : "block"}}> Finalizar jogada </button>*/
