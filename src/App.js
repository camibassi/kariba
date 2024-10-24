import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';
import useWebSocket from './hooks/useWebSocket';

export default function App() {
  const { user } = useContext(AuthContext);
  const [background, setBackground] = useState("/images/natureza.png");
  const [backgroundCard, setBackgroundCard] = useState('default');
  const webSocket = useWebSocket('wss://1na5t5v281.execute-api.sa-east-1.amazonaws.com/production/');

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
              background: background,
              webSocket: webSocket
            }} />
        ) : (
          <Navigate to="login" />
        )}
      </div>
    </>
  );
}
