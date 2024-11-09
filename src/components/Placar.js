import React, {Component} from 'react';

const Placar = (props) => {
      return(
        <div id ="placar" className='d-flex'>
           <h6 style={{right: '66%', fontSize: "small", top: "17%", textAlign:"center", display: "inline-block", width: "30px"}}>Você</h6>
           <h6 style={{right: '84%', top: "14px", textAlign:"center", display: "inline-block", width: "30px"}}>{props.meuPlacar}</h6>
           <img src="images/placar_barramaior.png"/>
           <h6 style={{right: '34%', fontSize: 'small', top: "49%", textAlign:"center", display: "inline-block", width: "30px"}}>Adversário</h6>
           <h6 style={{right: '6%', top: "14px", textAlign:"center", display: "inline-block", width: "30px"}}>{props.adversario}</h6>
        </div>
      );
}

export default Placar;