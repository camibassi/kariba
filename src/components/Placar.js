import React, {Component} from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Placar = (props) => {
  const { user, logout } = useContext(AuthContext);
  const primeiroNome = user.nome ? user.nome.split(" ")[0].toUpperCase() : user.username?.split(" ")[0].toUpperCase();

    return(
        <div id ="placar" className='d-flex'>
           <h6 style={{right: '66%', fontSize: "small", top: "17%", textAlign:"center", display: "inline-block", width: "30px"}}>{primeiroNome}</h6>
           <h6 style={{right: '84%', top: "14px", textAlign:"center", display: "inline-block", width: "30px"}}>{props.meuPlacar}</h6>
           <img src="images/placar_barramaior.png"/>
           <h6 style={{right: '40%', fontSize: 'small', top: "49%", textAlign:"center", display: "inline-block", width: "30px"}}>ADVERSÁRIO</h6>
           <h6 style={{right: '6%', top: "14px", textAlign:"center", display: "inline-block", width: "30px"}}>{props.adversario}</h6>
        </div>
      );
}

export default Placar;