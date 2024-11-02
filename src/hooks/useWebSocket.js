import { useCallback, useState } from "react";

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [gameState, setGameState] = useState({});
  const [connectionId, setConnectionId] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [gameId, setGameId] = useState(null);

  const open = () => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("Conectado ao WebSocket");
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Verifique se a mensagem foi enviada pelo próprio cliente
      if (data.clientId && data.clientId === connectionId) return;

      setMessages((prevMessages) => [...prevMessages, event.data]);

      if (data.action === 'gameState') {
        setGameId(data.gameState.cards.gameId);
        setGameState(data.gameState);
        setConnectionId(data.connectionId);
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };
  };

  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        // Inclua um clientId ou algum identificador para diferenciar a mensagem
        const messageWithId = JSON.stringify({ ...message, clientId: connectionId });
        socket.send(messageWithId);
      }
    },
    [socket, connectionId]
  );

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
    closeSocket,
    gameState,
    isConnected,
    open,
    connectionId,
    gameId, 
    setGameState
  };
};

export default useWebSocket;
