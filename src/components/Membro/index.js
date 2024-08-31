import React, {Component} from 'react';

class Membro extends Component{

    //para permitir a troca de nome dinalica
    constructor(props){
        super(props);
        this.state = {
            nome: props.nome
        }
    
       this.entrar = this.entrar.bind(this);
    }

    entrar(nome){
        this.setState({nome: nome})
    }
    render(){
      return(
        <div>
           <h2 class="bem_vindo">Bem vindo{this.state.nome}</h2> 
           <button onClick={ () => this.entrar('Lucas') }>
            Entrar no sistema
            </button>
            <button onClick={() => this.setState({nome:''})}>
            Sair
            </button>

        </div>
      );
    }
}

export default Membro;