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
import useRequest from "../../hooks/useRequest";
import {useOutletContext} from 'react-router-dom'; 
import '../game/index.css'
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
    const context = useOutletContext();
    const webSocket = context.webSocket;
    const { loading, error, sendRequest } = useRequest();
    const navigate = useNavigate();

    async function iniciaPartida() {
        //sendMessage("Iniciar partida");
        visivel.apareceCarta();
        cartasMao.adicionarCarta();
        cartasMao.adicionarCarta();
        setMostrarContador(true);
    }

    // Função que finaliza a partida
    async function finalizaPartida() {
        webSocket.closeSocket();
        navigate("/menu");
    }

    // Array de objetos para os botões
    const botoes = [
        { texto: 'Iniciar', onClick: iniciaPartida, mostrar: !visivel.status },
        { texto: 'Encerrar', onClick: finalizaPartida, mostrar: visivel.status }
    ];

    useEffect(() => {
        if (webSocket.gameState) {
            const placar = webSocket.gameState.score;
            setMeuPlacar(placar.find(placar => placar.connectionId == webSocket.connectionId)?.collectedCards);
            setPlacarAdversario(placar.find(placar => placar.connectionId != webSocket.connectionId)?.collectedCards);
            
        }
    }, [webSocket.gameState]);

    return (
        <div className="overflow-hidden">
            <MenuNavbar>
                <h1>
                    <img src="/images/favicon.png" alt="Logo" /> Kariba <img src="/images/favicon.png" alt="Logo" />
                </h1>
            </MenuNavbar>
            <div className="position-relative" style={{ height: '90vh' }}>

                <Lagoa board={board}
                    cartas={cartasMao}
                    guardarCartas={(numero) => {
                        setMinhasCartasGuardadas(cartasGuardadas + numero);
                        setMeuPlacar(cartasGuardadas + numero);
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
                    match={webSocket.gameState.match}
                    currentPlayerConId={webSocket.connectionId}/>}

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
