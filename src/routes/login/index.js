import React, { useContext, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../login/index.css'; // Estilos adicionais
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';
import useRequest from '../../hooks/useRequest';
import Loading from '../../components/Loading';
import Rodape from "../../components/Rodape";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // Estado para mensagem de erro
  let form;
  const setRef = (element) => form = element;
  const request = useRequest({});

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleLogin = (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      return setValidated(true);
    }

    setValidated(false);

    request.sendRequest({
      url: `user?username=${username}&password=${password}`,
    }, (response) => {
      if (response.details.username) {
        login(response.details);
        navigate('/menu');
      } 
      else 
        setPasswordError(response.details); 
    });
  };

  return (
    <>
      {request.loading && <Loading />}
      <Container className="light-login-container">
        <Form className="light-login-form" noValidate validated={validated ?? false} ref={setRef}>
          <img className="logonovo" src="images/novologo.png" alt="logo" />
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="light-label">Login <br/>Nome de usuário</Form.Label>
            <Form.Control
              type="text"
              required={true}
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value?.toLowerCase())}
              className="light-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="light-label">Senha</Form.Label>
            <Form.Control
              type="password"
              required={true}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="light-input"
            />
            {/* Exibe mensagem de erro de senha */}
            {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
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
      <Rodape/>
    </>
  );
};

export default Login;
