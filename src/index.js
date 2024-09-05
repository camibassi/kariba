import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MenuPrincipal from './routes/menuPrincipal';
import Game from './routes/game';
import User from './routes/user';
import Store from './routes/store';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />}>
          <Route path="*" element={<MenuPrincipal />} />
          <Route path="game" element={<Game />} />
          <Route path="user" element={<User />} />
          <Route path="store" element={<Store />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

