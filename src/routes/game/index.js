import Deck from "../../components/deck";
import Lagoa from "../../components/lagoa";
import Mao from "../../components/mao";
import Placar from "../../components/placar";
import Adversario from "../../components/adversario";
import Contador from "../../hooks/contador_mensagem"; 
import useBoard from "../../hooks/useBoard";
import "../game/index.css";
import UseCartasMao from "../../hooks/UseCartasMao";
import useShowHide from "../../hooks/showHide";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuNavbar from "../../components/menuNavbar";
import useWebSocket from "../../hooks/useWebSocket"; 
import useRequest from "../../hooks/useRequest";

export default function Game() {
    // Conexão WebSocket
    const { messages, sendMessage } = useWebSocket('wss://1na5t5v281.execute-api.sa-east-1.amazonaws.com/dev/');
    
    const board = useBoard();
    const visivel = useShowHide();
    const [mostrarContador, setMostrarContador] = useState(false);
    const cartasMao = UseCartasMao({ setContador: setMostrarContador });
    const [meuPlacar, setMeuPlacar] = useState(0);
    const [placarAdversario, setPlacarAdversario] = useState(0);
    const [cartasGuardadas, setMinhasCartasGuardadas] = useState(0);
    const [gameId, setGameId] = useState(null); // Altere para null inicialmente

    const { data, loading, error, sendRequest } = useRequest();
    const navigate = useNavigate();

    // Função que inicia a partida
    const iniciaPartida = async () => {
        sendMessage(JSON.stringify({ action: 'startGame' }));
        visivel.apareceCarta();
        cartasMao.adicionarCarta();
        cartasMao.adicionarCarta();
        setMostrarContador(true); // Exibe o contador ao iniciar a partida
    };

    // Exemplo de manipulação de mensagens recebidas pelo WebSocket
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = JSON.parse(messages[messages.length - 1]);

            if (lastMessage.connectionId) {
                setGameId(lastMessage.connectionId); // Define o gameId recebido do WebSocket
            }

            console.log("Mensagem recebida do WebSocket:", lastMessage);
            
            // Você pode manipular a mensagem recebida aqui
            if (lastMessage.action === 'updateScore') {
                setPlacarAdversario(lastMessage.score);
            }
        }
    }, [messages]);

    // useEffect para fazer a requisição quando gameId estiver definido
    useEffect(() => {
        if (gameId) {
            const settings = {
                url: '/production/startGame', // URL do endpoint
                method: 'POST',
                body: { gameId }, // Payload com gameId
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            };

            sendRequest(settings)
                .then(response => {
                    console.log("Resposta do servidor:", response); // Manipule a resposta conforme necessário
                })
                .catch(err => {
                    console.error("Erro ao iniciar o jogo:", err);
                });
        }
    }, [gameId, sendRequest]); // Dependências do useEffect

    // Exibe mensagens de erro ou loading
    useEffect(() => {
        if (error) {
            console.error('Erro ao iniciar a partida:', error);
        }
    }, [error]);

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
                    <button onClick={iniciaPartida} disabled={loading}
                        style={{ display: visivel.status === true ? "none" : "block" }}>
                        {loading ? 'Iniciando...' : 'Iniciar'}
                    </button>
                </div>

                {/* Exibe o Contador condicionalmente */}
                {mostrarContador && <Contador />} 

                <Deck cartas={cartasMao} visibilidade={visivel} />
                <Placar meuPlacar={meuPlacar} adversario={placarAdversario} />
                <Mao cartas={cartasMao} board={board} />
                <Adversario visibilidade={visivel} />
            </div>
        </div>
    );
}
