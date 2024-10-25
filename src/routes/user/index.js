import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import { useOutletContext } from "react-router-dom";
import './index.css';
import BotaoLigarDesligar from "../../hooks/useOnOff";
import MenuNavbar from "../../components/MenuNavbar";
import { Link } from "react-router-dom";

export default function User() {
    const context = useOutletContext();
    const { user } = useContext(AuthContext); 

    return(   
        <>

        <MenuNavbar>
            <div id="navPerfil" >    
                <h1>
                    <img src="/images/favicon.png" alt="Logo" /> Perfil do usuário <img src="/images/favicon.png" alt="Logo" />
                </h1>
            </div>
        </MenuNavbar>


            <div className="iconePerfil">
                <img src="images/icone100.png"/>
                <h2>{user.username?.toUpperCase()}</h2>
 
            </div>

            <div id="userContainer">
                <div id="userEsq">
                    <h2>Configurações</h2>
                        <div className="mediaControl">
                            <img src="images/play.png"/>
                            <h3>Música</h3>
                            <BotaoLigarDesligar/>
                        </div>
                        <div className="mediaControl">
                            <img src="images/audio.png"/>
                            <h3>Som</h3>
                            <BotaoLigarDesligar/>
                        </div>
                    <h2>Ações</h2>
                        <div className="mediaControl">
                            <img src="images/cards/default/9.png"/>
                            <h3>Carta coringa</h3>
                            <BotaoLigarDesligar/>
                        </div>
                        <div className="mediaControl">
                            <img src="images/perfil.png"/>
                            <h3>Trombeta</h3>
                            <BotaoLigarDesligar/>
                        </div>
                        <div className="mediaControl">
                            <img src="images/play.png"/>
                            <h3>Ação 3</h3>
                            <BotaoLigarDesligar/>
                        </div>
                        <div className="mediaControl">
                            <img src="images/audio.png"/>
                            <h3>Ação 4</h3>
                            <BotaoLigarDesligar/>
                        </div>                        
                </div>

                <div id="userDir">
                    <h2>Histórico de Pontuação</h2>
            
                </div>
            </div>

        </>
    );
}

/*
               <div id="divMoeda2">    
                        <img id="moeda" src="images/moeda.png"/>
                        <div id="divMoeda">
                            R$ 0,00
                        </div>
                </div>
*/