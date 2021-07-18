import {Navbar, NavDropdown, Container, Nav} from 'react-bootstrap';

const Navigation = () => {
    return ( 
        <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Plate Registry</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="enroll">Enrollment</Nav.Link>
            <Nav.Link href="createOwner">Create Owner</Nav.Link>
            <NavDropdown title="Register" id="collasible-nav-dropdown">
              <NavDropdown.Item href="vehicle">Vehicle</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Customer</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
}

export default Navigation;