import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import useWebSocket from '../../hooks/useWebSocket'; // Importa o hook personalizado
import './index.css';

function WebSocketScreen() {
  const { messages, isConnected } = useWebSocket('wss://1na5t5v281.execute-api.sa-east-1.amazonaws.com/production/');
  const [isWaiting, setIsWaiting] = useState(true);
  const [foundPlayer, setFoundPlayer] = useState(false); // Para monitorar a mudança de texto
  const navigate = useNavigate(); // Hook de navegação do React Router

  // Monitora se o WebSocket conectou e recebeu mensagens
  useEffect(() => {
    if (messages.length > 0) {
      setIsWaiting(false);
      setFoundPlayer(true); // Atualiza estado para mostrar "Jogador encontrado!"

      // Após 2 segundos, redireciona para a rota /game
      const timer = setTimeout(() => {
        navigate('/game');
      }, 2000);

      // Limpa o timeout se o componente for desmontado antes
      return () => clearTimeout(timer);
    }
  }, [messages, navigate]);

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
