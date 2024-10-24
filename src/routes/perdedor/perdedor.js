import React, { useEffect } from 'react';
import './styleperdedor.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

export default function Perdedor() {
  useEffect(() => {
    const audio = new Audio('/sounds/somtriste.mp3');
    audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));
  }, []);

  return (
    <div>
      <div id="perdedor">
        <Container fluid>
          <h1 id="perdedor">DERROTAS</h1>
          <p id="perdedor">TAMBÉM CRIAM VENCEDORES, BOA SORTE NA PRÓXIMA!</p>

          <div className="button-container">
            <Link className="button" to="/aguardando">Jogar Novamente</Link>
            <Link className="button" to="/menu">Menu Principal</Link>
          </div>
          <img src='../../../images/tristedeitado.png'/>
        </Container>
      </div>
    </div>
  );
}
