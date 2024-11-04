import './index.css';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Sobre() {
  return (
    <div id="sobre">
      <Navbar className="navbar-sobre">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/menu">Menu</Navbar.Brand>
            <Link className="icone" to="/user">
              <img src="images/icone50.png" alt="Ícone do usuário" />
            </Link>
        </Container>
      </Navbar>
      
      <div className="organograma">
        <div className="ceo-container">
          <div className="box ceo">
            <p>Alan Soares</p>
            <span>Gerente</span>
          </div>
        </div>
        <div className="container">
          <div className="col">
            <div className="box front">
              <p>FRONT-END</p>
            </div>
            <div className="sub-boxes">
              <div className="box analista">Camila Bassi</div>
              <div className="box analista">Gabriel Rodrigues</div>
              <div className="box analista">Roger Albuquerque</div>
              <div className="box analista">Rosemeire Ramos</div>
            </div>
          </div>
          <div className="col">
            <div className="box back">
              <p>BACK-END</p>
            </div>
            <div className="sub-boxes">
              <div className="box analista">Alan Soares</div>
              <div className="box analista">Amanda Pires</div>
              <div className="box analista">Isaac Figueiredo</div>
              <div className="box analista">Roger Albuquerque</div>
            </div>
          </div>
          <div className="col">
            <div className="box bd">
              <p>BANCO DE DADOS</p>
            </div>
            <div className="sub-boxes">
              <div className="box analista">Raphael Carvalhal</div>
              <div className="box analista">Raul Cezar</div>
              <div className="box analista">Roger Tioji</div>
              <div className="box analista">Thaiany Paina</div>
              <div className="box analista">Roger Albuquerque</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
