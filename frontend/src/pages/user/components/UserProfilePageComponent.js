import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";

const UserProfilePageComponent = ({ updateUserApiRequest, fetchUser, userInfoFromRedux, setReduxUserState, 
                                    reduxDispatch, localStorage, sessionStorage }) => {

    const [validated, setValidated] = useState(false);
    const [updateUserResponseState, setUpdateUserResponseState] = useState({ success: "", error: ""});
    const [passwordMatchState, setPasswordMatchState] = useState(true);
    const [userLogged, setUserLogged] = useState({});

    const userInfo = userInfoFromRedux;

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmPassword]")
        if(confirm.value === password.value) {
            setPasswordMatchState(true);
        }else {
            setPasswordMatchState(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget.elements;

        const name = form.name.value;
        const lastName = form.lastName.value;
        const phoneNumber = form.phoneNumber.value;
        const address = form.address.value;
        const country = form.country.value;
        const city = form.city.value;
        const zipCode = form.zipCode.value;
        const password = form.password.value;

        if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value) {
            updateUserApiRequest(name, lastName, phoneNumber, address, country, city, zipCode, password)
            .then(data =>{
                setUpdateUserResponseState({success: data.success, error: ""});
                reduxDispatch(setReduxUserState({ doNotLogout: userInfo.doNotLogout, ...data.userUpdated }));
                if(userInfo.doNotLogout) localStorage.setItem("userInfo", JSON.stringify({doNotLogout: true, ...data.userUpdated}));
                else sessionStorage.setItem("userInfo", JSON.stringify({doNotLogout: false, ...data.userUpdated}));
            })
            .catch(err => setUpdateUserResponseState({error: err.response.data.message ? err.response.data.message : err.response.data}));
        }

    setValidated(true);
    };

    useEffect(() => {
        fetchUser(userInfo._id)
            .then((res) => setUserLogged(res))
            .catch(err => err.response.data.message ? err.response.data.message : err.response.data)
    }, []);
    
    return (
        <Container>
            <Row className="mt-5">
                <Col md={6}>
                    <h1>Edit your profile</h1>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationName">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={userLogged.name}
                                name="name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationLastName">
                            <Form.Label>Your last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={userLogged.lastName}
                                placeholder="Enter your last name"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="validationEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled value={`${userLogged.email}   If you want to change email, remove account first`} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={userLogged.phoneNumber}
                                placeholder="Enter your phone number"
                                name="phoneNumber" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={userLogged.address} 
                                placeholder="Enter your address"
                                name="address" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={userLogged.country} 
                                placeholder="Enter your country"
                                name="country" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={userLogged.city} 
                                placeholder="Enter your city"
                                name="city" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicZip">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={userLogged.zipCode} 
                                placeholder="Enter your zip code"
                                name="zipCode" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                required 
                                name="password" 
                                minLength={6} 
                                onChange={onChange} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">Password should have at least 6 characters</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="validationRepeatPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Repeat password" 
                                required 
                                name="confirmPassword" 
                                minLength={6} 
                                onChange={onChange}
                                isInvalid={!passwordMatchState} />
                            <Form.Control.Feedback type="invalid">
                                Both password should match.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Update
                        </Button>

                        <Alert className="mt-2" show={updateUserResponseState && updateUserResponseState.error!==""} variant="danger">
                            Something went wrong.
                        </Alert>
                        <Alert className="mt-1" show={updateUserResponseState && updateUserResponseState.success==="User updated"} variant="info">
                            User updated succesfully!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default UserProfilePageComponent;