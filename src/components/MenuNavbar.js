import { Container, Nav, Navbar } from "react-bootstrap";
import { FaReply } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";
import './styles/menuNavbar.css'; // Estilos adicionais

const MenuNavbar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar className={"styled-navbar w-100" + props.className || ""} style={{zIndex: '1', height: '45px'}}>
        <Container>
          <Navbar.Brand className="navbar-brand">Kariba</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" onClick={() => navigate('../menu')}>
              <FaReply className="navbar-icon" /> Menu
            </Nav.Link>
          </Nav>
          <div className="custom-content">
          {props.children}
          </div>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MenuNavbar;
