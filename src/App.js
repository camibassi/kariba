/*import { Outlet } from "react-router-dom";
import MenuPrincipal from "./routes/menuPrincipal";
import Game from "./routes/game";

export default function App()
{
  return (
    <>
      <Outlet />
      
    </>
  );
}*/
import { Outlet } from "react-router-dom";
import { useState } from "react";  // Importando useState para controle de filtros
import MenuPrincipal from "./routes/menuPrincipal";
import Game from "./routes/game";

export default function App() {
  const [filter, setFilter] = useState('');

  function changeFilter(f)
  {
    let root = document.getElementById("root");
    console.log( root, f );
    if( f == "" )
      root.style="";
    else
      root.style = "filter : url("+ f +"); ";
    console.log( "filter : url("+ f +"); " );
  }

  return (
    <>
      {/* Div que aplica o filtro ao conteúdo */}
      <div>
        <Outlet />  {/* Conteúdo dinâmico das rotas */}
      </div>
      
      {/* Botões para alternar os filtros */}
      <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <button onClick={() => changeFilter('') }>Normal</button>
        <button onClick={() => changeFilter("#protanopia") }  >Protanopia</button>
        <button onClick={() => changeFilter("#deuteranopia") }>Deuteranopia</button>
        <button onClick={() => changeFilter("#tritanopia") } >Tritanopia</button>
        <button onClick={() => changeFilter("#achromatomaly") } >Achromatopsia</button>

      </div>
    </>
  );
}
