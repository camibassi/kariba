import './index.css'
import MenuNavbar from "../../components/MenuNavbar";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Sobre()
{
  return(
    <div id="sobre">
        <MenuNavbar>
        <div id="navSobre" >    
            <h1>
                <img src="/images/favicon.png" alt="Logo" /> Equipe Kariba <img src="/images/favicon.png" alt="Logo" />
            </h1>
            <Link className="icone" to="/user"><img src="images/icone50.png"/></Link>
        </div>
        </MenuNavbar>
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
                        <div class="box analista">Rosemeire Ramos</div>
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
                        <div class="box analista">Roger Albuquerque</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  ); 
}