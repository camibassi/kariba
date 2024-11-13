import React, { useEffect } from 'react';
import './abandono.css';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import {useOutletContext} from 'react-router-dom'; 

export default function Abandono() {
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
    const audio = new Audio('/sounds/somtriste.mp3');
    audio.play().catch(error => console.log("Erro ao reproduzir áudio:", error));
  }, []);

  const context = useOutletContext();
  const webSocket = context.webSocket;

  return (
    <div>
      <div id="abandono">
        <Container fluid>
          <h1 id="abandono">VISH...</h1>
          <p id="abandono">SEU ADVERSÁRIO ARREGOU, VOCÊ ESTÁ SOZINHO AQUI!</p>

          <div className="button-container">
          <Link className="botao" onClick={() => {
                        webSocket.open();
                    }} to="/aguardando">Jogar Novamente</Link>
            <Link className="botao" to="/menu">Menu Principal</Link>
          </div>
          <img id='abandono-image' src='../../images/abandono.gif' alt='jonhtravolta'/>
        </Container>
      </div>
      <img className="bola-de-feno" src="../../images/bola_de_feno.png" alt="bola de feno rolando" />
    </div>
    
  );
}