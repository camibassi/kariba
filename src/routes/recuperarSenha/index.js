import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../login/index.css'; // Estilos adicionais
import { useNavigate } from 'react-router-dom';

const RecuperarSenha = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();

  return (
    <Container className="light-login-container">
      <Form className="light-login-form">
        <h2 className="light-title">Kariba</h2>
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

        <Button variant="primary" className="light-button mt-3" type="submit" onClick={() => navigate('../login')}>Enviar e-mail de recuperação</Button>
      </Form>
    </Container>
  );
};

export default RecuperarSenha;