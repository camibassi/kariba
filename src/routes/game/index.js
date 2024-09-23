import Deck from "../../components/deck";
import Lagoa from "../../components/lagoa";
import Mao from "../../components/mao";
import Placar from "../../components/placar";
import Adversario from "../../components/adversario";

import "../game/index.css"
import UseCartasMao from "../../hooks/UseCartasMao";
import useShowHide from "../../hooks/showHide";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game() {

    const cartasMao = UseCartasMao();
    const visivel = useShowHide();
    
    async function iniciaPartida(){
        visivel.apareceCarta();
        cartasMao.adicionarCarta();
        cartasMao.adicionarCarta();
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

    // async function enviarMensagem() {
    //     if (socket && socket.readyState === WebSocket.OPEN) {
    //         const payload = {
    //             action: "sendMessage",
    //             message: messageToSend
    //         };
    //         socket.send(JSON.stringify(payload));
    //         console.log("Mensagem enviada: ", payload);
    //     }
    // }

    async function fazerJogada(jogada) {
        try {
            const response = await fetch("https://368nvxbbr4.execute-api.sa-east-1.amazonaws.com/dev/makeMove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jogada)
            });

            const data = await response.json();
            console.log("Resposta da rota makeMove:", data);

            // Atualize o estado do jogo com a resposta, se necessário
            setGameState(data.gameState);
        } catch (error) {
            console.error("Erro ao fazer a jogada:", error);
        }
    }

    function finalizarJogada() {
        const jogada = {
            gameId: "example-game-id", // Substitua com o ID do jogo real
            move: "player-move" // Substitua com a jogada real
        };

        fazerJogada(jogada);
    }

    return(
        <div>
            <Lagoa/>

            <div id = "botoes">
                <button onClick={iniciaPartida}
                style={{ display: visivel.status === true ? "none" : "block"}}> Iniciar </button>
            </div>
            <Deck cartas={cartasMao} visibilidade={visivel}/>
            <Placar/>
            <Mao cartas={cartasMao} />
            <Adversario visibilidade={visivel}/>
        </div>
      );
}

/*<button onClick={finalizaPartida} 
style={{ display: visivel.status === false ? "none" : "block"}}> Finalizar jogada </button>*/
