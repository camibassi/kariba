// Contador.js
import React, { useState, useEffect } from 'react';

export default function Contador() {
  const [timeLeft, setTimeLeft] = useState(15); // Contador de 15 segundos

  useEffect(() => {
    if (timeLeft === 0) return; // Para o contador quando chegar a 0

    // Diminui o contador a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado ou quando o contador termina
    return () => clearInterval(timer);
  }, [timeLeft]);

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
      }}
    >
      {timeLeft > 0 ? timeLeft : 'Tempo esgotado'}
      {timeLeft > 0 ? timeLeft : 'Aguarde'}

    </div>
  );
}
