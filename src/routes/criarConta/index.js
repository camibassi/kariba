import React, { useState, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../login/index.css'; // Estilos adicionais
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import Loading from '../../components/Loading';
import { FaReply } from 'react-icons/fa6';
import { Toast } from 'primereact/toast'; // Importando o Toast do PrimeReact

const CriarConta = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [validated, setValidated] = useState(false); 
  const [passwordConfirm, setPasswordConfirm] = useState(''); 
  const navigate = useNavigate();
  const request = useRequest();
  const toast = useRef(null);
  let form;
  const setRef = (element) => form = element;

  const criarConta = () => {

    if (password !== passwordConfirm) {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'As senhas estão diferentes. Corrija.', life: 3000 });
      return;
    }

    if (!form.checkValidity()) {
      return setValidated(true);
    }

    setValidated(false);

    request.sendRequest({
      url: 'user',
      method: 'POST',
      body: { username: username, password: passwordConfirm }
    }, (response) => {
      if (response.error) {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: response.error, life: 3000 });
        return;
      }

      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: response.message, life: 3000 });
      setTimeout(() => {
        navigate('../login')
      })
    });
  }

  return (<>
    {request.loading && <Loading />}
    <Toast ref={toast} position="center" />
    <Container className="light-login-container">
      <Form className="light-login-form" noValidate validated={validated ?? false} ref={setRef}>
        <h2 className="light-title">Kariba</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="light-label">Nome de usuário</Form.Label>
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
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="light-label">Confirme sua senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a sua senha"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="light-input"
          />
        </Form.Group>

        <Button variant="primary" type="button" className="light-button mt-3" onClick={criarConta}>
          Criar Conta
        </Button>
        <Button variant="primary" type="button" className="light-button mt-3" onClick={() => {
          navigate('/login')
        }}>
          <FaReply /> Voltar para o login
        </Button>
      </Form>
    </Container>
  </>);
};

export default CriarConta;
