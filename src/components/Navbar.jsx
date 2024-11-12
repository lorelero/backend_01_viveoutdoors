import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const CustomNavbar = () => {
  return (
    <>
      {/* Menú superior con íconos de redes sociales */}
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#">
              <i className="fab fa-facebook-f"></i>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="fab fa-twitter"></i>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="fab fa-instagram"></i>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="fab fa-linkedin-in"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Menú principal */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img
            src="./logo_100x100.png"
            alt="Logo"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/sale">Sale</Nav.Link>
            <Nav.Link href="/carpas">Carpas</Nav.Link>
            <Nav.Link href="/mochilas">Mochilas</Nav.Link>
            <Nav.Link href="/sacos&colchonetas">Sacos & Colchonetas</Nav.Link>
            <Nav.Link href="/accesorios">Accesorios</Nav.Link>
          </Nav>
          <Form inline className="ml-3">
            <div className="d-flex m-2">
              <FormControl
                type="text"
                placeholder="Buscar"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Buscar</Button>
            </div>
          </Form>
          <Nav className="ml-2">
            {/* Enlace al perfil de usuario */}
            <Nav.Link href="/account" className="text-white">
              <i className="fas fa-user"></i>
            </Nav.Link>
            <Nav.Link href="#" className="text-white">
              <i className="fas fa-shopping-cart"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
