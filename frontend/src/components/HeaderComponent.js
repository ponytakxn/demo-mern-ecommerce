import { Navbar, Nav, Container, NavDropdown, Badge, Form, Dropdown, Button, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand href="/">BEST ONLINE SHOP</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav>
                    <InputGroup>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                All
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item>Accesorios</Dropdown.Item>
                                <Dropdown.Item>Ropa</Dropdown.Item>
                                <Dropdown.Item>Electrónicos</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Otros</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>            
                        <Form.Control type="text" placeholder="Búsqueda..." />
                        <Button variant="warning">
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                </Nav>
            </Nav>
            <Nav>
                <LinkContainer to="/admin/orders">
                    <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Juan Pérez" id="collasible-nav-dropdown">
                    <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My orders</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/user" as={Link} to="/user">My profile</NavDropdown.Item>
                    <Dropdown.Divider />
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <Nav.Link as={Link} to="/cart">
                    <Badge pill bg="danger">
                        2
                    </Badge>
                    <i className="bi bi-cart4"></i>
                    <span className="ms-1">CART</span>
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
    );
}

export default HeaderComponent;

