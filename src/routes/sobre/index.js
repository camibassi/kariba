import './index.css';
import MenuNavbar from "../../components/MenuNavbar";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Sobre() {
  return (
    <div id="sobre">
      <MenuNavbar>
        <div id="navSobre">    
          <h1>
            <img src="/images/favicon.png" alt="Logo" /> Equipe Kariba <img src="/images/favicon.png" alt="Logo" />
          </h1>
          <Link className="icone" to="/user">
            <img src="images/icone50.png" alt="User Icon" />
          </Link>
        </div>
      </MenuNavbar>
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
