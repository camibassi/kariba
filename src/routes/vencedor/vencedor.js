import React, { useEffect } from 'react';
import './stylevencedor.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

export default function Vencedor() {
  useEffect(() => {
    const audio = new Audio('/sounds/somalegre.mp3');
    audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));
  }, []);

  return (
    <div>
      <div id="confetti"></div> {/* Confete fora de #vencedor */}
      <div id="vencedor">
        <Container fluid>
          <h1 id="vencedor">TEMOS UM</h1>
          <h1 id="vencedor">VENCEDOR</h1>
          <p id="vencedor">EM BREVE TEREMOS UM NOVO REI NA SAVANA!</p>

          <div className="button-container">
            <Link className="botao" to="/aguardando">Jogar Novamente</Link>
            <Link className="botao" to="/menu">Menu Principal</Link>
          </div>
          <img id="vencedor-image" src='../../../images/fant51.gif' alt="Elefante Vitoria"/>
        </Container>
      </div>
    </div>
  );
}
