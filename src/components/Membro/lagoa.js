import React, {Component} from 'react';
import Pilha from './pilha';


//criação do componente pilha. Serão as imagens que ficarão em volta do lago

class Lagoa extends Component{

    constructor(props){
        super(props);
    
    }

    render(){
      return(
        <div id ="lagoa">
           <div>
                <img src="images/lagoa.png" />
                <div class="envelope">
                    <Pilha id ="pilha1" value="1"/>
                    <Pilha id ="pilha2" value="2"/>
                    <Pilha id ="pilha3" value="3"/>
                    <Pilha id ="pilha4" value="4"/>
                    <Pilha id ="pilha5" value="5"/>
                    <Pilha id ="pilha6" value="6"/>
                    <Pilha id ="pilha7" value="7"/>
                    <Pilha id ="pilha8" value="8"/>
                </div>
           </div>
            
 
        </div>
      );
    }
}

export default Lagoa;

/*
           <Pilha id ="pilha3" value="3"/>
           <Pilha id ="pilha4" value="4"/>
           <Pilha id ="pilha5" value="5"/>
           <Pilha id ="pilha6" value="6"/>
           <Pilha id ="pilha7" value="7"/>
           <Pilha id ="pilha8" value="8"/> 
*/