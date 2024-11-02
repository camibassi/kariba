import Deck from "../../components/Deck";
import Lagoa from "../../components/Lagoa";
import Mao from "../../components/Mao";
import Placar from "../../components/Placar";
import Contador from "../../components/Contador";
import MenuNavbar from "../../components/MenuNavbar";
import CartasAdversario from "../../components/CartasAdversario";
import useShowHide from "../../hooks/useShowHide";
import useRequest from "../../hooks/useRequest";
import {useOutletContext} from 'react-router-dom'; 
import '../game/index.css'
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function Game() {
    const visivel = useShowHide();
    const [minhaVez, setMinhaVez] = useState(true);
    const [mostrarContador, setMostrarContador] = useState(false);
    const [quantidadeMovimentada, setQuantidadeMovimentada] = useState(0);
    const [cartaMovimentada, setCartaMovimentada] = useState('');
    const [match, setMatch] = useState({});
    const [meuPlacar, setMeuPlacar] = useState(0);
    const [placarAdversario, setPlacarAdversario] = useState(0); // Futuramente virá do backend.
    const [cartasGuardadas, setMinhasCartasGuardadas] = useState(0);
    const context = useOutletContext();
    const webSocket = context.webSocket;
    const { loading, error, sendRequest } = useRequest();
    const navigate = useNavigate();
    const [cartas, setCartas] = useState([]);
    const [cartasAdversario, setCartasAdversario] = useState([]);

    async function iniciaPartida() {
        visivel.apareceCarta();
        setMostrarContador(true);
    }

    // Função que finaliza a partida
    async function finalizaPartida() {
        webSocket.closeSocket();
        navigate("/menu");
    }

    const toast = useRef(null);

    // Array de objetos para os botões
    const botoes = [
        { texto: 'Iniciar', onClick: iniciaPartida, mostrar: !visivel.status },
        { texto: 'Encerrar', onClick: finalizaPartida, mostrar: visivel.status }
    ];

    useEffect(() => {
        if (webSocket.gameState) {
            const placar = webSocket.gameState.score.players;
            setMatch(webSocket.gameState.match)
            setMeuPlacar(placar.find(placar => placar.connectionId == webSocket.connectionId)?.collectedCards);
            setPlacarAdversario(placar.find(placar => placar.connectionId != webSocket.connectionId)?.collectedCards);
            setCartas(webSocket.gameState.deck.players.find(cartas => cartas.connectionId  == webSocket.connectionId)?.deck);
            setCartasAdversario(webSocket.gameState.deck.players.find(cartas => cartas.connectionId  != webSocket.connectionId)?.deck);
        }
    }, [webSocket.gameState]);

    return (
        <div className="overflow-hidden">
            
    <Toast ref={toast} position="center" />
            <MenuNavbar>
                <h1>
                    <img src="/images/favicon.png" alt="Logo" /> Kariba <img src="/images/favicon.png" alt="Logo" />
                </h1>
            </MenuNavbar>
            <div className="position-relative" style={{ height: '90vh' }}>

                <Lagoa board={webSocket.gameState.board.positions}
                    cartas={cartas}
                    setMensagemErroMovimentacao={(mensagem) => {
                        toast.current.show({ severity: 'error', summary: 'Erro', detail: mensagem, life: 3000 });
                    }}
                    cartaMovimentada={cartaMovimentada}
                    connectionId={webSocket.connectionId}
                    gameId={webSocket.gameId}
                    guardarCartas={(numero) => {
                       setCartaMovimentada(numero);
                       setQuantidadeMovimentada(quantidadeMovimentada + 1);
                    }} />

                <div id="botoes">
                    {botoes.map((botao, index) =>
                        botao.mostrar && (
                            <button key={index} onClick={botao.onClick}>
                                {botao.texto}
                            </button>
                        )
                    )}
                </div>

                {/* Exibe o Contador condicionalmente */}
                {mostrarContador && <Contador 
                    setMinhaVez={setMinhaVez}
                    match={match}
                    currentPlayerConId={webSocket.connectionId}/>}

                <Deck onClick={() => {
                    sendRequest({
                        url: 'makeMove',
                        method: 'POST',
                        body: {
                          player: webSocket.connectionId,
                          quantity: parseInt(quantidadeMovimentada),
                          position: parseInt(cartaMovimentada),
                          gameId: webSocket.gameId
                        }
                      }, () => {
                        setCartaMovimentada('');
                        setQuantidadeMovimentada(0);
                      })
                }} cartas={cartas} visibilidade={visivel} />
                <Placar meuPlacar={meuPlacar} adversario={placarAdversario} />
                <Mao minhaVez={minhaVez} cartas={cartas} board={webSocket.gameState.board} />
                <CartasAdversario cartas={cartasAdversario} visibilidade={visivel} />
            </div>

            {/* Exibe loading e erros da requisição */}
            {loading && <p>Carregando dados...</p>}
            {error && <p>Erro ao carregar dados: {error.message}</p>}
        </div>
    );
}
