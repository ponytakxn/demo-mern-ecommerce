import { Col, Container, Form, Row, Alert, ListGroup, Button } from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const AdminOrderDetailsPage = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Order details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col>
                            <h2>Shipping</h2>
                            <b>Name: </b> Juan Pérez <br />
                            <b>Adress: </b> Calle falsa #123 <br />
                            <b>Phone: </b> +56988877756 <br />
                        </Col>

                        <Col>
                            <h2>Payment method</h2>
                            <Form.Select disabled>
                                <option value="pp">
                                    Paypal
                                </option>
                                <option value="cod">
                                    Cash on delivery (delivery may be delayed)
                                </option>
                            </Form.Select>
                        </Col>
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant="danger">
                                    Not delivered
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">
                                    Paid on 21-10-2022
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br/>

                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {Array.from({length: 3}).map((item,idx) => (
                            <CartItemComponent key={idx} />
                        ) )}
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Oder summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Items price (after tax): <span className="fw-bold">$500</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className="fw-bold">Included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Tax: <span className="fw-bold">Included</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-danger">
                            Total price: <span className="fw-bold">$550</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button size="lg" variant="primary" type="button">
                                    Mark as delivered
                                </Button>
                            </div>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminOrderDetailsPage;