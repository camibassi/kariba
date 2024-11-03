import React, { useState, useEffect } from 'react';

export default function Contador({ match, currentPlayerConId, setMinhaVez }) {
  const [timeLeft, setTimeLeft] = useState(15); // Contador inicial de 15 segundos
  const [message, setMessage] = useState('Aguarde sua vez');
  const [isCounting, setIsCounting] = useState(false); // Controle do estado de contagem

  useEffect(() => {
    let timer;

    const isPlayer1 = match.player1conId === currentPlayerConId;
    const isPlayer2 = match.player2conId === currentPlayerConId;

    // Verifica o estado do jogo e se o jogador atual está jogando
    if (match.gameState === 'in progress') {
      if ((isPlayer1 && match.player1State === 'playing') || 
          (isPlayer2 && match.player2State === 'playing')) {
        if (message === 'Aguarde sua vez') {
          setMessage('Sua vez');
          setMinhaVez(true);
          setTimeLeft(15); // Reseta o contador
          setIsCounting(false); // Para a contagem anterior
        }
      } else {
        if (message !== 'Aguarde sua vez') {
          setMessage('Aguarde sua vez');
          setMinhaVez(false);
          setIsCounting(false); // Para a contagem se não for a vez do jogador
          setTimeLeft(15); // Reseta o contador se não for a vez
        }
      }
    }
/*
    // Inicia a contagem após 2 segundos de "Sua vez"
    if (message === 'Sua vez' && !isCounting) {
      timer = setTimeout(() => {
        setMessage('Contador');
        setIsCounting(true); // Começa a contagem
      }, 2000);
    }

    // Inicia o contador de 15 segundos
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setMessage('Tempo esgotado');
      setIsCounting(false); // Para a contagem
      setTimeLeft(15); // Reseta o contador para a próxima rodada
    }

    // Exibe "Tempo esgotado" por 2 segundos
    if (message === 'Tempo esgotado') {
      timer = setTimeout(() => {
        setMessage('Aguarde sua vez');
        setIsCounting(false); // Para a contagem
      }, 2000);
    }
*/
    // Limpa o intervalo ou timeout quando o efeito termina ou o estado muda
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [match, currentPlayerConId, message, timeLeft, isCounting, setMinhaVez]);

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
