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
import useApareceMouseBotao from "../../hooks/useApareceMouseBotao";
import { Dialog } from "primereact/dialog";
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";

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
    const { mostrarMensagem, onMouseEnter, onMouseLeave } = useApareceMouseBotao();
    const [showNotMyTurnMessage, setShowNotMyTurnMessage] = useState(false);
    const [promise, setPromise] = useState(null);
    const [qtdElefantes, setQtdElefantes] = useState(3);
    const [elefanteJogada, setElefanteJogada] = useState(false);
    const { user } = useContext(AuthContext);

    // Função que finaliza a partida
    async function finalizaPartida() {
        // Zera a mão e a ultima jogada
        setCartas([]);
        setCartaMovimentada('');
        setQuantidadeMovimentada(0);

        // Reseta as configuracoes do websocket
        webSocket.closeSocket();
        navigate('../menu');

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
//          let totalAdversario = cartasAdversario.reduce((partialSum, c) => partialSum + parseInt(c.quantity), 0);
            // verifica se cartasAdversario for undefined ou null 
            let totalAdversario = cartasAdversario?.reduce((partialSum, c) => partialSum + parseInt(c.quantity), 0) || 0;
            setCartasAdversario(totalAdversario);

            // Atualiza a contagem de elefantes
            let origemConnectionId=webSocket.connectionId;
            
            // Atualiza a quantidade de elefantes
            let elefantes = 0;
            let match = webSocket.gameState.match;
            if( match.player1conId == webSocket.connectionId )
            { 
                elefantes = match.actionElephantPlayer1;
            }
            else
            {
                elefantes = match.actionElephantPlayer2;
            }
            setQtdElefantes(elefantes);
            setElefanteJogada(false);

            let abandoned = webSocket.gameState.match.gameState;
    
            if (abandoned === "abandoned"){
                webSocket.closeSocket();
                navigate("/abandono");
            }    


        }
    }, [webSocket.gameState]);

    function finalizaJogada()
    {
        setElefanteJogada(false);

        // Nova verificação para saber se é a vez do jogador
        if (!minhaVez) {
            alert("Aguarde sua vez...");
            return;
        }

        if( quantidadeMovimentada == 0 ){
            alert("Faça uma jogada");
            return ;
        }
        
        if(!promise)
        setPromise(sendRequest({
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
            setPromise(null);
        }));
    }
    useEffect(() => {
        if( webSocket.elefante === 1 )
        {
            disparaElefante();
        }
    }, [webSocket.elefante]);


    // Dispara a animação do elefante
    function disparaElefante()
    {
        console.log("Elefante!!!");
        // Exibe o elefante
        let trombeta = document.getElementById("trombeta");
        trombeta.className = "anim";

        // Toca o audio do elefante
        let audio = trombeta.getElementsByTagName("audio")[0];
        audio.play();

        // Apos 15s reseta
        setTimeout( function(){
            console.log("Parar animação") 
            trombeta.className = "hidden";
            audio.pause();
            audio.currentTime = 0;
            webSocket.setElefante(0);
        }, 15000 );
    }

    // Envia a mensagem para disparar o elefante no outro jogador
    function sendActionElefante()
    {
        setElefanteJogada(true);

        let gameState=webSocket.gameState;
        if (gameState==null){
            return
        }

        let origemConnectionId=webSocket.connectionId;
        let destinoConnectionId;
        let player1=webSocket.gameState.match.player1conId;
        let player2=webSocket.gameState.match.player2conId;
        let origemNumero=0;
        let destinoNumero=0;
        let qtdElefanteP1=webSocket.gameState.match.actionElephantPlayer1;
        let qtdElefanteP2=webSocket.gameState.match.actionElephantPlayer2;
        let origemQtdeEl=0;

        if (player1==origemConnectionId){
            origemNumero=1;
            origemQtdeEl=qtdElefanteP1;
            destinoNumero=2;
            destinoConnectionId=player2;

        } else {
            origemNumero=2;
            origemQtdeEl=qtdElefanteP2;
            destinoNumero=1;
            destinoConnectionId=player1;
        }

        let body={
            "gameId": webSocket.gameId,
            "origin": { 
                "player": origemConnectionId,
                "number": origemNumero
            },
            "destination": {
                "player": destinoConnectionId,
                "number": destinoNumero
            }
          };

          sendRequest({
            url: 'actions/elephant',
            method: 'PUT',
            body: body
          }, () => {
                // setQtdElefantes(origemQtdeEl);
                if (origemQtdeEl>0){
                    setShowDialog(true);
                }
        });

    
    }

    useEffect(() => {
        if (showDialog) {
        const timer = setTimeout(() => {
            setShowDialog(false); // Fecha o diálogo após 2 segundos
        }, 2500);

      // Limpeza do timer caso o componente seja desmontado
          return () => clearTimeout(timer);
    }
      }, [showDialog]); // Esse efeito só será executado quando isOpen mudar
      
    return (
        <div className="overflow-hidden">
            <Toast ref={toast} position="center" />
            <MenuNavbar className="navbar-game" finalizaPartida={finalizaPartida} exibirDialogo={true}>
                <Container className="d-flex justify-content-end align-items-center">
                    <div className="d-flex align-items-center">
                     <div className="nameuser">
                         {user.nome?.toUpperCase() || user.username?.toUpperCase()}
                    </div>
                     </div>
                </Container>
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
                        if(!promise)
                            setPromise(sendRequest({
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
                                    setPromise(null);
                                }))
                    }}
                    
                    currentPlayerConId={webSocket.connectionId}/>}

                <Deck onClick={finalizaJogada} cartas={cartas} visibilidade={visivel} />
                <Placar meuPlacar={meuPlacar} adversario={placarAdversario} />
                <Mao minhaVez={minhaVez} cartas={cartas} board={webSocket.gameState.board} />
                <CartasAdversario cartas={cartasAdversario} visibilidade={visivel} />
                <audio id="distribuiCarta" src='/sounds/distribuir_cartas.mp3'/>
            </div>
            <div 
                onMouseEnter={() => {
                    onMouseEnter();
                    if (!minhaVez) setShowNotMyTurnMessage(true); // Exibe a mensagem se não for a vez
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                    setShowNotMyTurnMessage(false); // Oculta a mensagem ao sair do mouse
                }}
            >
                    <img class="botaoTrombeta" style={{ 
                        visibility: visivel ? "visible" : "hidden",
                        opacity: minhaVez || (qtdElefantes==0) || elefanteJogada ? 0.5 : 1, // Reduz opacidade se for sua vez
                        cursor: minhaVez  || (qtdElefantes==0) || elefanteJogada ? "not-allowed" : "pointer" // Cursor muda quando desabilitado
                    }} src="/images/perfil - botao.png" onClick={sendActionElefante}/>
                    {mostrarMensagem === 1 && !minhaVez && qtdElefantes && !elefanteJogada && ( // Exibe a mensagem de arraste apenas se for a vez
                        <div id="mensagemTrombeta">
                            Provocar {qtdElefantes}x
                        </div>
                    )}
                    {qtdElefantes===0 && ( // Exibe a mensagem de arraste apenas se for a vez
                        <div id="mensagemTrombeta">
                            Esgotado
                        </div>
                    )}
                </div>


                <div id="trombeta" class="hidden">
                    <img class="elefante" src="images/elefante andando.gif"/>
                    <audio id="audio-elefante" loop>
                        <source src="/sounds/elefante.mp3" type="audio/mp3" />
                    </audio>
                </div>
                
                {showDialog && (
                <Dialog
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                header="Elefante enviado para o adversário"
                >
                    <div className="dialog-content">
                        <img id="funnyElephant"src="images/funny_elephant.gif"/>
                    </div>
                </Dialog>
                )}


            {/* Exibe loading e erros da requisição */}
            <div className="mensagem-status">
                {loading && <p>Carregando dados...</p>}
                {error && <p>Erro ao carregar dados: {error.message}</p>} 
            </div>
           
        </div>
    );
}
