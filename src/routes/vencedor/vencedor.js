import React, { useEffect } from 'react';
import './stylevencedor.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import {useOutletContext} from 'react-router-dom'; 

export default function Vencedor() {
 
  const { audioRef } = useOutletContext();
  useEffect(() => {
    // Pausar a música de fundo ao entrar na tela
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Reproduzir a música de fundo ao sair da tela
    return () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };
  }, [audioRef]);
 
  useEffect(() => {
    const audio = new Audio('/sounds/somalegre.mp3');
    audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));
  }, []);

  const context = useOutletContext();
  const webSocket = context.webSocket;

  return (
    <div>
      <div id="confetti"></div> {/* Confete fora de #vencedor */}
      <div id="vencedor">
        <Container fluid>
          <h1>TEMOS UM</h1>
          <h1>VENCEDOR</h1>
          <p>EM BREVE TEREMOS UM NOVO REI NA SAVANA!</p>
  
          <div className="button-container">
            <Link className="botao" onClick={() => {
                        webSocket.open();
                    }} to="/aguardando">Jogar Novamente</Link>
            <Link className="botao" to="/menu">Menu Principal</Link>
          </div>
          <img className="vencedor-image" src='../../../images/fant51.gif' alt="Elefante Vitoria"/>
        </Container>
      </div>
    </div>
  );
  
}
