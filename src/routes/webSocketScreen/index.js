import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom'; // Importa o hook useNavigate
import useWebSocket from '../../hooks/useWebSocket'; // Importa o hook personalizado
import './index.css';

function WebSocketScreen() 
{
  const context = useOutletContext();
  const webSocket = context.webSocket;
  const [isWaiting, setIsWaiting] = useState(true);
  const [foundPlayer, setFoundPlayer] = useState(false); 
  const navigate = useNavigate(); 

  // Função que finaliza a partida
      async function finalizaPartida() {
        webSocket.closeSocket();
        navigate("/menu");
    }

    // Monitora se o WebSocket conectou e recebeu mensagens
  useEffect(() => {

    if (webSocket.messages.length > 0) {
      setIsWaiting(false);
      setFoundPlayer(true);

      const timer = setTimeout(() => {
        navigate('/game');
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

  async function finalizaPartida() {
    webSocket.closeSocket();
    navigate("/menu");
  }


  return (
    <div className="websocket-container">
      {isWaiting ? (
        <h1 className="loading-text">Aguardando outro jogador conectar à partida<span className="dots">...</span></h1>
      ) : foundPlayer ? (
        <h1 className="loading-text">Jogador encontrado! Conectando-se à partida...</h1>
      ) : null // Não exibe a última mensagem
      }
    </div>
  );
}

export default WebSocketScreen;
