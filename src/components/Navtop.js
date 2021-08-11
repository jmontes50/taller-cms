import React,{useContext} from "react";
import { Navbar, Container ,Nav} from "react-bootstrap";
import Logo from "../assets/Logo.png"
import { UserContext } from "../context/UserContext";
import {Link} from "react-router-dom"

function Navtop() {

  const {setAuthUser} = useContext(UserContext)

  const logout = () => {
    setAuthUser(null)
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="font-weight-bold"><img src={Logo} alt="logo" style={{width:'30px', marginRight:8}}/>CodiBlog</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
          <Link className="nav-link" to="/login">
            Ingresar
          </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navtop;
