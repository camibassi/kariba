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
                <a href="https://www.linkedin.com/in/alansolima" target="_blank">

                    <div class="box ceo">
                        <p>Alan Soares</p>
                        <span>Gerente</span>
                    </div>
                </a>                        
            </div>
            <div class="container">
                <div class="col">
                    <div class="box front">
                        <p>FRONT-END</p>
                    </div>
                    <div class="sub-boxes">
                        <a href="https://www.linkedin.com/in/camila-fernandes-a76a80271/" target="_blank">
                            <div class="box analista">Camila Bassi</div>
                        </a>                        
                        <a href="https://www.linkedin.com/in/gabriel-rodrigues-45b418289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                            <div class="box analista">Gabriel Rodrigues</div>
                        </a>                        
                        <a href="https://www.linkedin.com/in/devrogeralbuquerque?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                            <div class="box analista">Roger Albuquerque</div>
                        </a>                        
                        <a href="http://www.linkedin.com/in/rosemeire-ramos-ponzeto-5b981731" target="_blank">
                            <div class="box analista">Rosemeire Ponzeto</div>
                        </a>                        

                    </div>
                </div>
                <div class="col">
                    <div class="box back">
                        <p>BACK-END</p>
                    </div>
                    <div class="sub-boxes">
                        <a href="https://www.linkedin.com/in/alansolima" target="_blank">
                            <div class="box analista">Alan Soares</div>
                        </a>                        
                        <a href="https://www.linkedin.com/in/amanda-cardoso-62ba3a213?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                            <div class="box analista">Amanda Pires</div>
                        </a>                        
                        <a href="https://www.linkedin.com/in/isaac-figueiredo-67b2a1149" target="_blank">
                            <div class="box analista">Isaac Figueiredo</div>
                        </a>                        
                    </div>
                </div>
                <div class="col">
                    <div class="box bd">
                        <p>BANCO DE DADOS</p>
                    </div>
                    <div class="sub-boxes">
                    <a href="https://www.linkedin.com/in/raphael-carvalhal-mota-348821201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                            <div class="box analista">Raphael Carvalhal</div>
                        </a>                        
                        <a href="https://www.linkedin.com/in/dev-raul-oliveira?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                            <div class="box analista">Raul Cezar</div>
                        </a>                        
                        <a href="https://github.com/pacgiras" target="_blank">
                            <div class="box analista">Roger Tioji</div>
                        </a>                        
                        <a href="https://www.linkedin.com/in/thaiany-paina?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                            <div class="box analista">Thaiany Paina</div>
                        </a>                        
                    </div>
                </div>
            </div>
         </div>
    </div>
  ); 
}