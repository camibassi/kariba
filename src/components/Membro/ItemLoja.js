import React from 'react';

const ItemLoja = (props) => 
  <div className="itemLoja">
      <h3>{props.name}</h3>
      <img src={props.imgSrc} alt="Ícone de Áudio" className="audio-icon" />
      {props.children}
  </div>

export default ItemLoja;