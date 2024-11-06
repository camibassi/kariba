import React, { useState, useEffect } from 'react';

export default function Contador({ match, currentPlayerConId, setMinhaVez, tempoEsgotado }) {
  const [timeLeft, setTimeLeft] = useState(15); // Contador inicial de 15 segundos
  const [message, setMessage] = useState('Aguarde sua vez');
  const [isCounting, setIsCounting] = useState(false); // Controle do estado de contagem

  // Verifica se é a vez do jogador e atualiza a mensagem
  useEffect(() => {
    const isPlayer1 = match.player1conId === currentPlayerConId;
    const isPlayer2 = match.player2conId === currentPlayerConId;

    if (match.gameState === 'in progress') {
      if ((isPlayer1 && match.player1State === 'playing') || 
          (isPlayer2 && match.player2State === 'playing')) {
        setMessage('Sua vez');
        setMinhaVez(true);
        setIsCounting(false); // Para a contagem anterior
        setTimeLeft(15); // Reseta o contador
      } else {
        setMessage('Aguarde sua vez');
        setMinhaVez(false);
        setIsCounting(false);
        setTimeLeft(15); // Reseta o contador se não for a vez
      }
    }
  }, [match, currentPlayerConId, setMinhaVez]);

  // Inicia o contador quando a mensagem é 'Sua vez' e depois de 2 segundos muda para contagem
  useEffect(() => {
    let timer;
    if (message === 'Sua vez' && !isCounting) {
      timer = setTimeout(() => {
        setMessage('Contador');
        setIsCounting(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [message, isCounting]);

  // Executa o contador quando `isCounting` está ativo
  useEffect(() => {
    if (isCounting && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setMessage('Tempo esgotado');
      setIsCounting(false);
      tempoEsgotado();
    }
  }, [isCounting, timeLeft]);

  // Exibe "Tempo esgotado" por 2 segundos e reseta a mensagem
  useEffect(() => {
    let timer;
    if (message === 'Tempo esgotado') {
      timer = setTimeout(() => {
        setMessage('Aguarde sua vez');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '54%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '10px',
        textAlign: 'center',
      }}
    >
      {/* Renderiza a mensagem ou o contador */}
      {message === 'Contador' ? timeLeft : message}
    </div>
  );
}
