import React, {Component} from 'react';

//criação do componente do deck
class Deck extends Component{

    constructor(props){
        super(props);
    
    }

    render(){
      return(
        <div id="deck">
           <img src="images/cards/default/verso.png"/> 
        </div>
      );
    }
}

export default Deck;