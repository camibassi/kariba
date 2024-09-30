import React, { useContext, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../login/index.css'; // Estilos adicionais
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 
    const handleLogin = (event) => {
      event.preventDefault(); 
      const userData = { username, password }; 
      login(userData);

      navigate('/menu');
    };

  return (
    <Container className="light-login-container">
      <Form className="light-login-form">
        <h2 className="light-title">Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="light-label">Nome de usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="light-input"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="light-label">Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="light-input"
          />
        </Form.Group>

        <Button variant="primary" className="light-button mt-3" type="submit" onClick={handleLogin}>
          Entrar
        </Button>

        <div className="extra-options mt-4">
          <Link to="/recuperarSenha" className="extra-link">Esqueci minha senha</Link>
          <span className="divider">|</span>
          <Link to="/criarConta" className="extra-link">Criar conta</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
