import { useEffect, useState, useCallback } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [gameState, setGameState] = useState({});
  const [connectionId, setConnectionId] = useState({});
  const [isConnected, setIsConnected] = useState(false); 

  const open = () => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);
  
    newSocket.onopen = () => {
      console.log("Conectado ao WebSocket");
      setIsConnected(true); // WebSocket conectado
    };

    newSocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      const data = JSON.parse(event.data);

      if (data.action === 'gameState') 
      {
        setGameState(data.gameState);
        setConnectionId(data.connectionId);
      }
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  }
  
  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message); 
      }
    },
    [socket]
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
    connectionId
  };
};

export default useWebSocket;