import React, {Component} from 'react';
import Membro from './components/Membro/';
import Lagoa from './components/Membro/lagoa';
import Deck from './components/Membro/deck';
import Placar from './components/Membro/placar';
import Mao from './components/Membro/mao';

class App extends Component{

  render(){
      return(
        <div>
            <Lagoa/>
            <Deck/>
            <Placar/>
            <Mao/>
        </div>
      );
    }
}

export default App;