import './index.css'
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

export default function Vencedor()
{
  return(
    <div>
        <Container fluid>
        <h1>TEMOS UM VENCEDOR</h1>
        <p>EM BREVE TEREMOS UM NOVO REI NA SAVANA!</p>

        <div class="button-container">
            <a href="#" class="button">JOGAR NOVAMENTE</a>
            <a href="#" class="button">MENU PRINCIPAL</a>
        </div>
        </Container>
        
    </div>
  ); 
}