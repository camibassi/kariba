import { useContext, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import { useOutletContext } from "react-router-dom";
import './index.css';
import BotaoLigarDesligar from "../../hooks/useOnOff";
import MenuNavbar from "../../components/MenuNavbar";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import { FaCoins, FaEye, FaEyeSlash } from "react-icons/fa"; // Importação dos ícones de olho
import { BsFillPersonFill } from "react-icons/bs";
import useRequest from "../../hooks/useRequest";
import Loading from "../../components/Loading";
import ReactInputMask from "react-input-mask";
import Rodape from "../../components/Rodape";


export default function User() {
    const countryOptions = [
        { label: "Brasil", value: "Brasil" },
        { label: "Estados Unidos", value: "Estados Unidos" },
        { label: "Alemanha", value: "Alemanha" },
        { label: "India", value: "India" },
        { label: "Japão", value: "Japão" }
    ];

    const { login } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const [isEditingSaldo, setIsEditingSaldo] = useState(false);
    const [saldo, setSaldo] = useState(user.saldo);
    const toggleEditingSaldo = () => setIsEditingSaldo(!isEditingSaldo);
    const handleSaldoChange = (e) => setSaldo(e.target.value);
    const handleSaldoBlur = () => setIsEditingSaldo(false);

    const salvar = () => {
        sendRequest({
            url: 'user',
            method: 'PUT',
            body: data
        }, async () => 
        {
            return await sendRequest({
                url: `user?username=${data.username}&password=${data.password}`,
            }, (responseUser) => {
                login(responseUser.details);
                return responseUser.details;
            })
        })
    }

    const { onChange, sendRequest, data, loading } = useRequest(user);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return(   
        <div id="user">
            {loading && <Loading />}
            <MenuNavbar>
                <Container fluid className="text-center mt-3">
                    <h1>
                        <img src="/images/favicon.png" alt="Logo" className="logo-icon" /> 
                        Perfil do Usuário 
                        <img src="/images/favicon.png" alt="Logo" className="logo-icon" />
                    </h1>
                </Container>
            </MenuNavbar>

            <Container className="my-5">
                <Card style={{maxHeight: '80vh'}} className="p-4 w-100 shadow-lg border-0">
                    <div className="text-center iconePerfil">
                        <img src="images/icone100.png" width={"70px"} alt="User Icon" className="profile-icon" />
                        <h2>{user.username?.toUpperCase()}</h2>
                    </div>

                    <Form className="mt-4">
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formNome">
                                    <Form.Label><BsFillPersonFill /> Nome</Form.Label>
                                    <Form.Control 
                                        name="nome" 
                                        onChange={onChange} 
                                        value={data.nome} 
                                        type="text" placeholder="Digite seu nome" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        name="email" 
                                        onChange={onChange} 
                                        value={data.email} type="email" placeholder="Digite seu email" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={3}>
                                <Form.Group className="mb-3 password-container" controlId="formPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control 
                                        name="password" 
                                        onChange={onChange} 
                                        value={data.password} 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Altere sua senha..." 
                                    />
                                    <div className="eye-icon" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3" controlId="formDataNascimento">
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control as={ReactInputMask} mask="**/**/****"
                                        name="dataNascimento" 
                                        onChange={onChange}  placeholder="__/__/____"
                                        value={data.dataNascimento} type="text" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formPais">
                                    <Form.Label>País</Form.Label>
                                    <Form.Select name="pais" onChange={onChange} value={data.pais}>
                                        <option key={0} value={null}></option>
                                        {countryOptions.map((pais, index) => <option key={index + 1} value={pais.value}>{pais.label}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4} className="text-center">
                                <h5 className="stat-title">Vitórias</h5>
                                <span className="stat-badge">{user.vitorias}</span>
                            </Col>
                            <Col md={4} className="text-center">
                                <h5 className="stat-title">Derrotas</h5>
                                <span className="stat-badge">{user.derrotas}</span>
                            </Col>
                            <Col md={4} className="text-center">
                                <h5 className="stat-title">Saldo</h5>
                                <div className="d-flex align-items-center justify-content-center">
                                    <FaCoins className="text-warning me-1" />
                                    {isEditingSaldo ? (
                                        <input
                                            type="number"
                                            value={saldo}
                                            name="saldo"
                                            onChange={(event) => {
                                                handleSaldoChange(event);
                                                onChange(event);
                                            }}
                                            onBlur={handleSaldoBlur}
                                            autoFocus
                                            className="stat-badge-input"
                                        />
                                    ) : (
                                        <span className="stat-badge" onClick={toggleEditingSaldo}>
                                            R$ {saldo}
                                        </span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Button variant="primary" onClick={salvar} className="w-100 mt-3">Salvar Alterações</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
}
