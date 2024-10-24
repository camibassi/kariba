import React, { useEffect } from 'react';
import './stylevencedor.css'
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

export default function Vencedor()
{
  useEffect(() => {
    const audio = new Audio('/sounds/somalegre.mp3'); // Caminho relativo da pasta public
    audio.play(); // Toca o som ao carregar
  }, []);
  return(
    <div id="vencedor">
        <Container fluid>
        <h1 id="vencedor">TEMOS UM</h1>
        <h1 id="vencedor">VENCEDOR</h1>
        <p id="vencedor">EM BREVE TEREMOS UM NOVO REI NA SAVANA!</p>

        <div class="button-container">
            <a href="#" class="button">JOGAR NOVAMENTE</a>
            <a href="menuPrincipal/index.js" class="button">MENU PRINCIPAL</a>
        </div>

        </Container>
        
    </div>
  ); 
}