import { Col, Container, Row, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useState } from "react";

const UserProfilePage = () => {
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
                            <Form.Control type="text" defaultValue="Juan Pérez" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationCustomUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                type="text"
                                defaultValue="elCallawawa3000"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="username"
                                />
                            </InputGroup>
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="validationEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled value="jperez@gmail.com   If you want to change email, remove account first" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" defaultValue="" placeholder="Enter your phone number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" defaultValue="" placeholder="Enter your country" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" defaultValue="" placeholder="Enter your city" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicZip">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control type="text" defaultValue="" placeholder="Enter your zip code" />
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

                        <Button variant="success" type="submit">
                            Update
                        </Button>

                        <Alert className="mt-2" show={true} variant="danger">
                            User with that email already exists!
                        </Alert>
                        <Alert className="mt-1" show={true} variant="info">
                            User updated succesfully!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default UserProfilePage;