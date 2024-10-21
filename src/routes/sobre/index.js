import './index.css'
import MenuNavbar from "../../components/MenuNavbar";
import { Container } from 'react-bootstrap';

export default function Sobre()
{
  return(
    <div id="sobre">
      <MenuNavbar>
            <h1>
                <img src="/images/favicon.png" alt="Logo" /> Como jogar o Kariba? <img src="/images/favicon.png" alt="Logo" />
            </h1>
        </MenuNavbar>
        <div class="organograma">
            <h1>Equipe Kariba</h1>
            <div class="ceo-container">
                <div class="box ceo">
                    <p>Alan Soares</p>
                    <span>Gerente</span>
                </div>
            </div>
            <div class="container">
                <div class="col">
                    <div class="box cfo">
                        <p>FRONT-END</p>
                    </div>
                    <div class="sub-boxes">
                        <div class="box analista">Camila Bassi</div>
                        <div class="box analista">Gabriel Rodrigues</div>
                        <div class="box analista">Roger Oliveira</div>
                        <div class="box analista">Rosemeire Ramos</div>
                    </div>
                </div>
                <div class="col">
                    <div class="box marketing">
                        <p>BACK-END</p>
                    </div>
                    <div class="sub-boxes">
                        <div class="box analista">Alan Soares</div>
                        <div class="box analista">Amanda Pires</div>
                        <div class="box analista">Isaac Figueiredo</div>
                    </div>
                </div>
                <div class="col">
                    <div class="box operacoes">
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
    </div>

  ); 
}