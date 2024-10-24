import { Container, Nav, Navbar } from "react-bootstrap";
import { FaReply, FaSignOutAlt } from "react-icons/fa"; // Ícone de logout
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './AuthContext'; // Ajuste o caminho conforme necessário
import './styles/menuNavbar.css'; // Estilos adicionais
import { Link } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext); // Consome o contexto de autenticação

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <>
      <Navbar className="styled-navbar">
        <Container>
          <Navbar.Brand className="navbar-brand">Kariba</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" onClick={handleLogout}>
              <FaSignOutAlt className="navbar-icon" /> Sair
            </Nav.Link>
            <Link className="icone" to="/user"><img src="images/icone50.png"/></Link>

          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Menu;
