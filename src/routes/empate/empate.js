import React, { useEffect } from 'react';
import './empate.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import {useOutletContext} from 'react-router-dom'; 

export default function Empate() {
  useEffect(() => {
    const audio = new Audio('/sounds/somsuspense.ogg');
    audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));
  }, []);

  const context = useOutletContext();
  const webSocket = context?.webSocket;

  return (
    <div id="empate">
      <Container fluid>
        <h1>EMPATOU</h1>
        <p>NA PRÓXIMA VAMOS VER QUEM É O MELHOR!</p>

        <div className="button-container">
          <Link className="botao" onClick={() => {
            webSocket.open();
            }} to="/aguardando">Jogar Novamente</Link>
          <Link className="botao" to="/menu">Menu Principal</Link>
        </div>
        <img id="empate-image" src='../../../images/elefantecaido.png' alt="Elefante Empate"/>
      </Container>
    </div>
  );
}
