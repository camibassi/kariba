import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MenuPrincipal from './routes/menuPrincipal';
import Game from './routes/game';
import User from './routes/user';
import Store from './routes/store';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Regras from './routes/regras';
import Sobre from './routes/sobre';
import MenuNavbar from './components/MenuNavbar';
import Login from './routes/login';
import { AuthProvider } from './components/AuthContext';
import CriarConta from './routes/criarConta';
import RecuperarSenha from './routes/recuperarSenha';
import WebSocketScreen from './routes/webSocketScreen';
import Vencedor from './routes/vencedor/vencedor';
import Perdedor from './routes/perdedor/perdedor';
import Empate from './routes/empate/empate';
import Abandono from './routes/abandono/abandono';
import RedefinirSenha from './routes/redefinir';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
    <Route path="criarConta" element={<CriarConta />} />
    <Route path="recuperarSenha" element={<RecuperarSenha />} />
    <Route path="redefinir" element={<RedefinirSenha />} />
    </Routes>
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<App />}>
          <Route path="menu" element={<MenuPrincipal />} />
          <Route path="game" element={<Game />} />
            <Route path="user" element={<User />} />
            <Route path="store" element={<Store />} />
            <Route path="regras" element={<Regras />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="vencedor" element={<Vencedor />} />
            <Route path="perdedor" element={<Perdedor />} />
            <Route path="empate" element={<Empate />} />
            <Route path="abandono" element={<Abandono />} />
            <Route path="aguardando" element={<WebSocketScreen />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
);

