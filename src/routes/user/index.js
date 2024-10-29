import { useContext, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import { useOutletContext } from "react-router-dom";
import './index.css';
import BotaoLigarDesligar from "../../hooks/useOnOff";
import MenuNavbar from "../../components/MenuNavbar";
import UpdateUserForm from "../../hooks/useAtualizaPerfil";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import { FaCoins } from "react-icons/fa"; // Ícone para o saldo de moedas
import { BsFillPersonFill } from "react-icons/bs";

const countryOptions = [
    { label: "Brazil", value: "Brazil" },
    { label: "United States", value: "United States" },
    { label: "Germany", value: "Germany" },
    { label: "India", value: "India" },
    { label: "Japan", value: "Japan" },
    // ...adicione outros países conforme necessário
];

export default function User() {
    const context = useOutletContext();
    const { user } = useContext(AuthContext);
    const [selectedCountry, setSelectedCountry] = useState(null);

    return(   
        <>
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
                        <img src="images/icone100.png" alt="User Icon" className="profile-icon" />
                        <h2>{user.username?.toUpperCase()}</h2>
                    </div>

                    <Form className="mt-4">
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formNome">
                                    <Form.Label><BsFillPersonFill /> Nome</Form.Label>
                                    <Form.Control type="text" placeholder="Digite seu nome" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Digite seu email" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formDataNascimento">
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formPais">
                                    <Form.Label>País</Form.Label>
                                    <Dropdown 
                                        value={selectedCountry} 
                                        options={countryOptions} 
                                        onChange={(e) => setSelectedCountry(e.value)} 
                                        placeholder="Selecione seu país" 
                                        className="w-100" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="my-4">
    <Col md={4} className="text-center">
        <h5 className="stat-title">Vitórias</h5>
        <span className="stat-badge">12</span>
    </Col>
    <Col md={4} className="text-center">
        <h5 className="stat-title">Derrotas</h5>
        <span className="stat-badge">5</span>
    </Col>
    <Col md={4} className="text-center">
        <h5 className="stat-title">Saldo</h5>
        <div className="d-flex align-items-center justify-content-center">
            <FaCoins className="text-warning me-1" />
            <span className="stat-badge">R$ 250,00</span>
        </div>
    </Col>
</Row>
                        <Button variant="primary" className="w-100 mt-3">Salvar Alterações</Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

/*
não remover! div da moeda, ainda verei onde vou colocar
               <div id="divMoeda2">    
                        <img id="moeda" src="images/moeda.png"/>
                        <div id="divMoeda">
                            R$ 0,00
                        </div>
                </div>
*/

/*
não remover! se der para configurar audio, utilizarei essa parte

                <div id="userEsq">
                    <h2>Configurações</h2>
                        <div className="mediaControl">
                            <img src="images/play.png"/>
                            <h3>Música</h3>
                            <BotaoLigarDesligar/>
                        </div>
                        <div className="mediaControl">
                            <img src="images/audio.png"/>
                            <h3>Som</h3>
                            <BotaoLigarDesligar/>
                        </div>

                        <div id='gifPerfil'>
                            <img src="images/fant51.gif"/>
                        </div>

                </div>

*/

