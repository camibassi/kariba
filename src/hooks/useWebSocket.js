import { useEffect, useState, useCallback } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  // Conecta ao WebSocket quando o hook é usado
  useEffect(() => {
    const newSocket = new WebSocket(url);  // Conecta ao WebSocket
    setSocket(newSocket);

    // Recebe mensagens do WebSocket
    newSocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
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
        socket.send(message);  // Envia mensagem ao WebSocket
      }
    },
    [socket] // Dependência de socket
  );

  return {
    messages,
    sendMessage,
  };
};

export default useWebSocket;