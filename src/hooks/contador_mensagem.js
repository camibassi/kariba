import React, { useState, useEffect } from 'react';

export default function Contador() {
  const [timeLeft, setTimeLeft] = useState(15); // Contador de 15 segundos
  const [message, setMessage] = useState('Sua vez'); // Estado para controlar as mensagens

  useEffect(() => {
    let timer;

    // Ciclo das mensagens
    if (message === 'Sua vez') {
      // Exibe "Sua vez" por 2 segundos
      timer = setTimeout(() => {
        setMessage('Contador');
      }, 2000);
    } else if (message === 'Contador') {
      // Inicia o contador se o tempo for maior que 0
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        // Quando o tempo chegar a 0, exibe "Tempo esgotado"
        setMessage('Tempo esgotado');
      }
    } else if (message === 'Tempo esgotado') {
      // Exibe "Tempo esgotado" por 2 segundos
      timer = setTimeout(() => {
        setMessage('Aguarde sua vez');
      }, 2000);
    } /*else if (message === 'Aguarde sua vez') {
      // Exibe "Aguarde sua vez" por 3 segundos, depois reinicia o ciclo
      timer = setTimeout(() => {
        setMessage('Sua vez');
        setTimeLeft(15); // Reseta o contador
      }, 3000);
    }*/

    // Limpa o intervalo/timeout ao desmontar o componente ou mudar de estado
    return () => clearTimeout(timer) || clearInterval(timer);
  }, [message, timeLeft]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
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
