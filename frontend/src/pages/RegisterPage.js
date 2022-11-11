import { Col, Container, Row, Form, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [validated, setValidated] = useState(false);

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmPassword]")
        if(confirm.value === password.value) {
            confirm.setCustomValidity("")
        }else {
            confirm.setCustomValidity("Passwords don't match")
        }
    };

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
                    <h1>Register</h1>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationName">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                            />
                            <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="validationCustomUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                type="text"
                                placeholder="Choose your username"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="username"
                                />
                                <Form.Control.Feedback type="invalid">
                                Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="validationEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" required name="email" />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email address.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required name="password" minLength={6} onChange={onChange} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">Password should have at least 6 characters</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationRepeatPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat password" required name="confirmPassword" minLength={6} onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">
                                Both password should match.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Row className="pb-2">
                            <Col>
                                Do you have an account already? 
                                {" "}<Link to={"/login"}>Login</Link>
                            </Col>
                        </Row>

                        <Button type="submit">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Submit
                        </Button>

                        <Alert className="mt-2" show={true} variant="danger">
                            User with that email already exists!
                        </Alert>
                        <Alert className="mt-1" show={true} variant="info">
                            User created succesfully!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default RegisterPage;