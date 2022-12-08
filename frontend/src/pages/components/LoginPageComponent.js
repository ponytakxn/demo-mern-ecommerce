import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPageComponent = ({ loginUserApiRequest, reduxDispatch, setReduxUserState }) => {
    const [validated, setValidated] = useState(false);
    const [loginUserResponseState, setLoginUserResponseState] = useState({success:"", error:"", loading:false});

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        const email = form.email.value;
        const password = form.password.value;
        const doNotLogout = form.doNotLogout.checked;

        if (form.checkValidity() === true && email && password) {
            setLoginUserResponseState({ loading: true });
            loginUserApiRequest(email, password, doNotLogout)
            .then((res) => {
                setLoginUserResponseState({ success: res.success, error:"", loading:false });

                if(res.userLoggedIn){
                    reduxDispatch(setReduxUserState(res.userLoggedIn));
                }

                if(res.success === 'user logged in' && !res.userLoggedIn.isAdmin){
                    window.location.href = '/user';
                } else window.location.href = '/admin/orders';
            })
            .catch((err) => setLoginUserResponseState({error: err.response.data.message ? err.response.data.message : err.response.data}));
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
                            {loginUserResponseState && loginUserResponseState.loading === true ? (
                                <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            ) : ""}
                            Login
                        </Button>

                        <Alert className="mt-2" show={loginUserResponseState && loginUserResponseState.error === 'wrong credentials'} variant="danger">
                            Wrong credentials
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default LoginPageComponent;