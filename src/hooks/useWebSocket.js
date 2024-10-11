import { useEffect, useState, useCallback } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [gameState, setGameState] = useState({}); // Adicionar estado do jogo
  const [isConnected, setIsConnected] = useState(false); // Adicionar flag para conexão

  // Conecta ao WebSocket quando o hook é usado
  useEffect(() => {
    const newSocket = new WebSocket(url); // Conecta ao WebSocket
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("Conectado ao WebSocket");
      setIsConnected(true); // WebSocket conectado
    };

    // Recebe mensagens do WebSocket
    newSocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);

      // Atualiza estado do jogo se a mensagem for relevante
      const data = JSON.parse(event.data);
      if (data.action === 'updateGameState') {
        setGameState(data.gameState);
      }
    };

    // Função de erro
    newSocket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    // Desconecta ao desmontar o componente
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [url]);

  // Função para enviar mensagens
  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message); // Envia mensagem ao WebSocket
      }
    },
    [socket] // Dependência de socket
  );

  // Função para fechar o WebSocket manualmente
  const closeSocket = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
      console.log("WebSocket fechado");
    }
  }, [socket]);

  return {
    messages,
    sendMessage,
    closeSocket, // Retorna a função de fechamento do WebSocket
    gameState,   // Retorna o estado do jogo
    isConnected, // Retorna o estado de conexão
  };
};

export default useWebSocket;