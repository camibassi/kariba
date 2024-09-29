import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        {user || ["/criarConta", "/recuperarSenha"].includes(window.location.pathname) ? (
          <Outlet />
        ) : (
          <Navigate to="login" />
        )}
      </div>
      
      
    </>
  );
}
