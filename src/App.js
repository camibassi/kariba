import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';

export default function App() {
  const { user } = useContext(AuthContext);
  const [background, setBackground] = useState("/images/natureza.png");
  const [backgroundCard, setBackgroundCard] = useState('default');

  useEffect(() => {
    const root = document.getElementById('root');
    
    if (root) 
      root.style.background = `url(${background})`;

  }, [background]);

  return (
    <>
      <div>
        {user || ["/criarConta", "/recuperarSenha"].includes(window.location.pathname) ? (
          <Outlet context={
            {
              setBackground: setBackground, 
              setBackgroundCard: setBackgroundCard, 
              backgroundCard: backgroundCard,
              background: background
            }} />
        ) : (
          <Navigate to="login" />
        )}
      </div>
    </>
  );
}
