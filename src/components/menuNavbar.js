import { Container, Nav, Navbar } from "react-bootstrap";
import { FaReply } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";

const MenuNavbar = () => 
{
  const navigate = useNavigate();

  return (
    <>
    <Navbar style={{height: '30px', backgroundColor: '#41616E'}}>
      <Container>
        <Navbar.Brand style={{color: 'white'}}>Kariba</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link style={{color: 'white'}} onClick={() => navigate('..')}><FaReply /> Menu</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Outlet />
    </>
  )
}

export default MenuNavbar;