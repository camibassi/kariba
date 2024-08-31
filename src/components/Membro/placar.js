import React, {Component} from 'react';

//criação do componente placar

class Placar extends Component{

    constructor(props){
        super(props);
    
    }

    render(){
      return(
        <div id ="placar">
           <img src="images/placar.png"/> 
        </div>
      );
    }
}

export default Placar;