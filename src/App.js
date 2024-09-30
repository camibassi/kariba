import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const { user } = useContext(AuthContext);
  const [background, setBackground] = useState("/images/natureza.png");

  useEffect(() => {
    const root = document.getElementById('root');
    
    if (root) 
      root.style.background = `url(${background})`;

  }, [background]);

  return (
    <>
      <div>
        {user || ["/criarConta", "/recuperarSenha"].includes(window.location.pathname) ? (
          <Outlet context={{setBackground: setBackground}} />
        ) : (
          <Navigate to="login" />
        )}
      </div>
    </>
  );
}
