import React, {Component} from 'react';

//criação do componente pilha. As imagens das cartas serão numeradas de 1 a 8 e dependendo do numero da pilha, chamará o numero da carta correto

class Pilha extends Component{

    constructor(props){
        super(props);
        this.value = props.value;
        this.id = props.id;
        this.cardClass = "carta " + "carta" + this.value;
        // Coloca a imagem correta para cada pilha
        this.imagemUrl = "";
        switch(this.value)
        {
          case "1": this.imagemUrl = "images/cards/default/1.png"; break;
          case "2": this.imagemUrl = "images/cards/default/2.png"; break;
          case "3": this.imagemUrl = "images/cards/default/3.png"; break;
          case "4": this.imagemUrl = "images/cards/default/4.png"; break;
          case "5": this.imagemUrl = "images/cards/default/5.png"; break;
          case "6": this.imagemUrl = "images/cards/default/6.png"; break;
          case "7": this.imagemUrl = "images/cards/default/7.png"; break;
          case "8": this.imagemUrl = "images/cards/default/8.png"; break;
        }
        console.log( this.value );
    }

    render(){
      return(
        <div id={this.id} class="pilha">
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>

            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
            <div class={this.cardClass}>
              <img src={this.imagemUrl}/>
            </div>
        </div>
      );
    }
}

export default Pilha;