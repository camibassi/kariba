import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './context/AuthContext'; // Ajuste o caminho conforme sua estrutura
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const { user } = useContext(AuthContext); // Consome o contexto de autenticação

  function changeFilter(f) {
    let root = document.getElementById("root");
    if (f === "") root.style = "";
    else root.style = "filter: url(" + f + ");";
  }

  return (
    <>
      <div>
        {user ? (
          <Outlet />
        ) : (
          <Navigate to="/" />
        )}
      </div>
      
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', display: 'flex', gap: '5px' }}>
        <button className="botaoRodape" onClick={() => changeFilter('')}>Normal</button>
        <button className="botaoRodape" onClick={() => changeFilter("#protanopia")}>Protanopia</button>
        <button className="botaoRodape" onClick={() => changeFilter("#deuteranopia")}>Deuteranopia</button>
        <button className="botaoRodape" onClick={() => changeFilter("#tritanopia")}>Tritanopia</button>
        <button className="botaoRodape" onClick={() => changeFilter("#achromatomaly")}>Achromatopsia</button>
      </div>
    </>
  );
}
