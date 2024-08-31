import React, {Component} from 'react';

//criação do componente mao. Uma div para cada carta na mão com no maximo 5 cartas

class Mao extends Component{

    constructor(props){
        super(props);
    
    }

    render(){
      return(
        <div id="mao">
            <div class="cartas"> 
              <div class="carta">
                 <img src="images/cards/default/1.png"/>             
              </div>

              <div class="carta">
                  <img src="images/cards/default/2.png"/>             
              </div>

              <div class="carta">
                  <img src="images/cards/default/3.png"/>             
              </div>

              <div class="carta">
                  <img src="images/cards/default/4.png"/>             
              </div>

              <div class="carta">
                  <img src="images/cards/default/5.png"/>             
              </div>

            </div>
        </div>
      );
    }
}

export default Mao;