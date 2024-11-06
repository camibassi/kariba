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
import Rodape from "../../components/Rodape";


export default function Game() {
    const visivel = useShowHide();
    const [minhaVez, setMinhaVez] = useState(true);
    const [mostrarContador, setMostrarContador] = useState(true);
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
    const [cartasAdversario, setCartasAdversario] = useState(0);
    const [showDialog, setShowDialog] = useState(false); // Controle da caixa de diálogo de seleção de modo


    // Função que finaliza a partida
    async function finalizaPartida() {
        // Zera a mão e a ultima jogada
        setCartas([]);
        setCartaMovimentada('');
        setQuantidadeMovimentada(0);

        // Reseta as configuracoes do websocket
        webSocket.closeSocket();
        navigate("/menu");
    }

    async function distribuirCarta() {
        const audioElement = document.getElementById("distribuiCarta");
        if (audioElement) {
            audioElement.play();
        }
    }
    
    const toast = useRef(null);

    useEffect(() => {
        if(webSocket.gameState.match.winner)
        {
            webSocket.closeSocket();
            if(webSocket.gameState.match.winner == webSocket.connectionId)
                navigate('../vencedor');
            else if(webSocket.gameState.match.winner == 'tied')
                navigate('../empate');
            else
                navigate('../perdedor');

        }
    }, [webSocket.gameState.match.winner])

    useEffect(() => {
        if (webSocket.gameState) {
            const placar = webSocket.gameState.score.players;

            console.log("GAMESTATE", webSocket.gameState );
;
            setMatch(webSocket.gameState.match)
            setMeuPlacar(placar.find(placar => placar.connectionId == webSocket.connectionId)?.collectedCards);
            setPlacarAdversario(placar.find(placar => placar.connectionId != webSocket.connectionId)?.collectedCards);
            setCartas(webSocket.gameState.deck.players.find(cartas => cartas.connectionId  == webSocket.connectionId)?.deck);
            
            
            let cartasAdversario = webSocket.gameState.deck.players.find(cartas => cartas.connectionId  != webSocket.connectionId)?.deck
            let totalAdversario = cartasAdversario.reduce((partialSum, c) => partialSum + parseInt(c.quantity), 0);
            setCartasAdversario(totalAdversario);
        }
    }, [webSocket.gameState]);

    function finalizaJogada()
    {
        if( quantidadeMovimentada == 0 ){
            alert("Faça uma jogada");
            return ;
        }
        
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
    }
    
    return (
        <div className="overflow-hidden">
            
    <Toast ref={toast} position="center" />
            <MenuNavbar finalizaPartida={finalizaPartida} exibirDialogo={true} >
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

                
               {/* <div className="botoes" id= "sairJogo" > 
                    <button onClick={() => setShowDialog(true)}> Sair do jogo </button>
                </div>*/}

                {/* Exibe o Contador condicionalmente */}
                {mostrarContador && <Contador 
                    setMinhaVez={setMinhaVez}
                    match={match}
                    tempoEsgotado={() => {
                        sendRequest({
                            url: 'makeMove',
                            method: 'POST',
                            body: {
                                player: webSocket.connectionId,
                                gameId: webSocket.gameId,
                                quantity: parseInt(quantidadeMovimentada),
                                position: parseInt(cartaMovimentada)
                            }
                            }, () => {
                                setCartaMovimentada('');
                                setQuantidadeMovimentada(0);
                            });
                    }}
                    
                    currentPlayerConId={webSocket.connectionId}/>}

                <Deck onClick={finalizaJogada} cartas={cartas} visibilidade={visivel} />
                <Placar meuPlacar={meuPlacar} adversario={placarAdversario} />
                <Mao minhaVez={minhaVez} cartas={cartas} board={webSocket.gameState.board} />
                <CartasAdversario cartas={cartasAdversario} visibilidade={visivel} />
                <audio id="distribuiCarta" src='/sounds/distribuir_cartas.mp3'/>
            </div>

            <Rodape/>
            {/* Exibe loading e erros da requisição */}
            {loading && <p>Carregando dados...</p>}
            {error && <p>Erro ao carregar dados: {error.message}</p>}
        </div>
    );
}
