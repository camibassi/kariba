import React, { useState } from 'react';

const Card = (props) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`cardComponent ${flipped && props.verso ? 'flip' : ''}`} 
      onMouseEnter={() => props.verso && setFlipped(true)}
      onMouseLeave={() => props.verso && setFlipped(false)}
    >
      <div className="card-inner">
        {/* Frente do card */}
        <div className="card-front">
          <h3>{props.name}</h3>
          <img className='rounded' style={props.style || {}} src={props.imgSrc} alt={props.alt} />
        </div>

        {/* Verso do card */}
        {props.verso && (
          <div className="card-back">
            <h3>{props.name}</h3>
            <img className='rounded' style={props.style || {}} src={`/images/cards/${props.item}/verso.png`} alt={props.alt} />
          </div>
        )}
      </div>
      {props.children}
    </div>
  );
};

export default Card;
