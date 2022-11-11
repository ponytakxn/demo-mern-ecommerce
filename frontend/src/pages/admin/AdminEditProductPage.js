import { useState } from "react";
import { Alert, Button, CloseButton, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminEditProductPage = () => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    const onHover = {
        cursor: "pointer",
        position: "absolute",
        left: "5px",
        top: "-10px",
        transform: "scale(2.7)"
    }
    
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-info my-3">
                        Go Back
                    </Link>
                </Col>
                
                <Col md={6}>
                    <h1>Edit product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" defaultValue="Panasonic"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" required as="textarea" rows={3} defaultValue="Product description" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name="count" required type="number" defaultValue="2"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text" defaultValue="$123"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>
                                Categroy
                            </Form.Label>
                            <Form.Select required name="category" aria-label="Default select example">
                                <option value="">Choose category</option>
                                <option value="1">Accesories</option>
                                <option value="2">Clothes</option>
                                <option value="3">Boxes</option>
                            </Form.Select>
                        </Form.Group>

                        <Row className="mt-5">
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributes">
                                    <Form.Label>Choose attribute for set value</Form.Label>
                                    <Form.Select name="attrKey" aria-label="Default select example">
                                        <option>Choose attribute</option>
                                        <option value="red">color</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicAttributes">
                                    <Form.Label>Set attribute value</Form.Label>
                                    <Form.Select name="attrVal" aria-label="Default select example">
                                        <option>Choose attribute value</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>attr key</td>
                                        <td>attr value</td>
                                        <td><CloseButton/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                    <Form.Label>Create new attribute</Form.Label>
                                    <Form.Control disabled={false} placeholder="first choose or create category" name="newAttrValue" type="text" />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                                        <Form.Label>Create attribute value</Form.Label>
                                        <Form.Control disabled={false} placeholder="first choose or create category" name="newAttrValue" type="text" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Alert variant="primary">After typing attribute key and value press enter on one of the fields</Alert>

                        <Form.Group className="mb-3 mt-3" controlId="formFileMultiple">
                            <Row>
                                <Col style={{position: "relative"}} xs={3}>
                                    <Image src="/images/monitors-category.png" fluid />
                                    <i style={onHover} className="bi bi-x text-danger"></i>
                                </Col>

                                <Col style={{position: "relative"}} xs={3}>
                                    <Image src="/images/games-category.png" fluid />
                                    <i style={onHover} className="bi bi-x text-danger"></i>
                                </Col>
                            </Row>
                            <Form.Label>Images</Form.Label>
                            <Form.Control multiple required type="file"/>
                        </Form.Group>

                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminEditProductPage;