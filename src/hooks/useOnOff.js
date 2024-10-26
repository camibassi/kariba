import React, { useState } from 'react';

export default function BotaoLigarDesligar() {
    // Estado que controla se está ligado ou desligado
    const [ligado, setLigado] = useState(false);

    // Função para alternar entre ligado e desligado
    const alternarEstado = () => {
        setLigado(!ligado);
    };

    return (
        <div>
            <button onClick={alternarEstado} 
                style={{
                    padding: '10px 20px',
                    backgroundColor: ligado ? 'green' : 'red',
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                }}
            >
                {ligado ? 'Desligar' : 'Ligar'}
            </button>
        </div>
    );
}
