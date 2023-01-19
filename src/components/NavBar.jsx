import React, { useState } from 'react'
import {Navbar, Container, Nav, NavDropdown, Offcanvas} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';
import '../styles/navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faBasketShopping, faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem('token', '');
    navigate('/login');
  }

  return (
    <>
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand to="/" as = {Link} className="bar-text" style={{color: "white"}}>Store App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link to="/login" as={Link} className="bar-text"><FontAwesomeIcon icon={faUser} style={{color: "white"}}/></Nav.Link>
          <Nav.Link onClick={handleShow}><FontAwesomeIcon icon={faBasketShopping} style={{color: "white"}} /></Nav.Link>
        <Nav.Link onClick={logout} className="bar-text"><FontAwesomeIcon icon={faRightFromBracket} style={{color: "white"}} /></Nav.Link>
        
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <CartSidebar show={show} handleClose={handleClose}/>
  </>

  )
}

export default NavBar