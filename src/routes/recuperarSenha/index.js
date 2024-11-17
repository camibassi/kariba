import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../login/index.css'; // Estilos adicionais
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';

const RecuperarSenha = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const request = useRequest();

  const recuperarSenha = () => {
    request.sendRequest({
      url: 'sendEmail',
      method: 'POST',
      body: {
        username: username
      }
    }, () => {
      navigate('../login');
    })
  }
  
  return (
    <Container className="light-login-container">
      <Form className="light-login-form">
      <img className="logonovo" src="images/novologo.png" alt="logo" />
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

        <Button variant="primary" type="button" className="light-button mt-3" onClick={recuperarSenha}>Enviar e-mail de recuperação</Button>
        <Button variant="primary" type="button" className="light-button mt-3" onClick={() => {
          navigate('/login')
        }}> Voltar para o login</Button>
      </Form>
    </Container>
  );
};

export default RecuperarSenha;