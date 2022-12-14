import { Navbar, Nav, Container, NavDropdown, Badge, Form, Dropdown, Button, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import { logout } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const HeaderComponent = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userRegisterLogin);
    const itemsCount = useSelector((state)=> state.cart.itemsCount);

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
                {userInfo.isAdmin ? (
                    <LinkContainer to="/admin/orders">
                        <Nav.Link>Admin</Nav.Link>
                    </LinkContainer>

                ) : userInfo.name && !userInfo.isAdmin ? (
                    <>
                    <NavDropdown title={`${userInfo.name} ${userInfo.lastName}`} id="collasible-nav-dropdown">
                        <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My orders</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/user" as={Link} to="/user">My profile</NavDropdown.Item>
                        <Dropdown.Divider />
                        <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link as={Link} to="/cart">
                        <Badge pill bg="danger">
                            {itemsCount ? itemsCount : ''}
                        </Badge>
                        <i className="bi bi-cart4"></i>
                        <span className="ms-1">CART</span>
                    </Nav.Link>
                    </>

                ) : (
                    <>
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    
                    <LinkContainer to="/register">
                        <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                    </>
                ) }
                
                
                
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
    );
}

export default HeaderComponent;

