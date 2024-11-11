import React, { useEffect } from 'react';
import './styleperdedor.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import {useOutletContext} from 'react-router-dom'; 

export default function Perdedor() {
  useEffect(() => {
    const audio = new Audio('/sounds/somtriste.mp3');
    audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));
  }, []);

  const context = useOutletContext();
  const webSocket = context.webSocket;

  return (
    <div>
      <div id="perdedor">
        <Container fluid>
          <h1 id="perdedor">DERROTAS</h1>
          <p id="perdedor">TAMBÉM CRIAM VENCEDORES, BOA SORTE NA PRÓXIMA!</p>

          <div className="button-container">
          <Link className="botao" onClick={() => {
                        webSocket.open();
                    }} to="/aguardando">Jogar Novamente</Link>
            <Link className="botao" to="/menu">Menu Principal</Link>
          </div>
          <img className='perdedor-image' src='../../images/tristedeitado.png' alt='Triste Deitado'/>
        </Container>
      </div>
    </div>
  );
}
