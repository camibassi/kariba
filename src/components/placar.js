import React, {Component} from 'react';

const Placar = (props) => {
      return(
        <div id ="placar" className='d-flex'>
           <h6 style={{right: '86%'}}>{props.adversario}</h6>
           <img src="images/placar.png"/>
           <h6 style={{right: '8%'}}>{props.meuPlacar}</h6>
        </div>
      );
}

export default Placar;