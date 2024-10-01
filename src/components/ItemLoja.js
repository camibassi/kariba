import React from 'react';

const ItemLoja = (props) => 
  <div className="itemLoja">
      <h3>{props.name}</h3>
      <img className='rounded' style={props.style || {}} src={props.imgSrc} 
        alt={props.alt}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave} />
      {props.children}
  </div>

export default ItemLoja;