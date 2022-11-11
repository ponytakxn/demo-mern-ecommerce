import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    setValidated(true);
    };
    
    return (
        <Container>
            <Row className="mt-5">
                <Col md={6}>
                    <h1>Login</h1>   
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>           
                        <Form.Group className="mb-3" controlId="validationEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" required name="email" />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email address.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required name="password" />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" name="doNotLogout" label="Do not logout"/>
                        </Form.Group>
                        
                        <Row className="pb-2">
                            <Col>
                                Don't you have an account? 
                                {" "}<Link to={"/register"}>Register</Link>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Login
                        </Button>

                        <Alert className="mt-2" show={true} variant="danger">
                            Wrong credentials
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default LoginPage;