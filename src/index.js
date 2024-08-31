import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MenuPrincipal from './routes/menuPrincipal';
import Game from './routes/game';
import User from './routes/user';
import { Route, Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

