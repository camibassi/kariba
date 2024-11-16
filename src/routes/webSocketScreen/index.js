import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom'; // Importa o hook useNavigate
import useWebSocket from '../../hooks/useWebSocket'; // Importa o hook personalizado
import './index.css';
import useRequest from '../../hooks/useRequest';

function WebSocketScreen() {
  const context = useOutletContext();
  const webSocket = context.webSocket;
  const [isWaiting, setIsWaiting] = useState(true);
  const [foundPlayer, setFoundPlayer] = useState(false); 
  const navigate = useNavigate(); 

  async function finalizaPartida() {
    webSocket.closeSocket();
    navigate("/menu");
  }

  const { sendRequest } = useRequest();

  // Monitora se o WebSocket conectou e recebeu mensagens
  useEffect(() => {
    if (webSocket.messages.length > 0) {
      setIsWaiting(false);
      setFoundPlayer(true);

      const timer = setTimeout(() => {
        sendRequest({
          url: `gameState?gameId=${webSocket.gameId}`
        }, () => {
          navigate('/game');
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [webSocket.messages, navigate]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      await finalizaPartida();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="websocket-container">
      {isWaiting ? (
        <h1 className="loading-text">
          Aguardando outro jogador conectar à partida<span className="dots">...</span>
        </h1>
      ) : foundPlayer ? (
        <h1 className="loading-text">Jogador encontrado! Conectando-se à partida...</h1>
      ) : null}
      {/* Botão para desistir de esperar */}
      <button
        className="desist-button"
        onClick={finalizaPartida}
        disabled={!webSocket.isConnected} // Desabilita o botão se não estiver conectado
      >
        Desistir de esperar
      </button>
    </div>
  );
}

export default WebSocketScreen;
