import './index.css';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rodape from "../../components/Rodape";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";


export default function Sobre(){
const { user } = useContext(AuthContext);

  return(
    <div id="sobre">
      <Navbar className="navbar-sobre">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/menu">Menu</Navbar.Brand>
          <div className="nameuser">
            {user.nome?.toUpperCase() || user.username?.toUpperCase()}
            </div>
            <Link className="icone" to="/user">
              <img src="images/icone50.png" alt="Ícone do usuário" />
            </Link>
        </Container>
      </Navbar>
        <div class="organograma">
            <div class="ceo-container">
                <div class="box ceo">
                    <p>Alan Soares</p>
                    <span>Gerente</span>
                </div>
            </div>
            <div class="container">
                <div class="col">
                    <div class="box front">
                        <p>FRONT-END</p>
                    </div>
                    <div class="sub-boxes">
                        <div class="box analista">Camila Bassi</div>
                        <div class="box analista">Gabriel Rodrigues</div>
                        <div class="box analista">Roger Albuquerque</div>
                        <div class="box analista">Rosemeire Ponzeto</div>
                    </div>
                </div>
                <div class="col">
                    <div class="box back">
                        <p>BACK-END</p>
                    </div>
                    <div class="sub-boxes">
                        <div class="box analista">Alan Soares</div>
                        <div class="box analista">Amanda Pires</div>
                        <div class="box analista">Isaac Figueiredo</div>
                        <div class="box analista">Roger Albuquerque</div>
                    </div>
                </div>
                <div class="col">
                    <div class="box bd">
                        <p>BANCO DE DADOS</p>
                    </div>
                    <div class="sub-boxes">
                        <div class="box analista">Raphael Carvalhal</div>
                        <div class="box analista">Raul Cezar</div>
                        <div class="box analista">Roger Tioji</div>
                        <div class="box analista">Thaiany Paina</div>
                    </div>
                </div>
            </div>
         </div>
         <Rodape />
    </div>
  ); 
}