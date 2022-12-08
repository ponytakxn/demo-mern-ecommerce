import { Col, Container, Form, Row, Alert, ListGroup, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const OrderDetailsPageComponent = ({ getOrder, markAsDelivered }) => {

    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isPaid, setIsPaid] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [orderButtonMessage, setOrderButtonMessage] = useState('Mark as delivered');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getOrder(id)
            .then((order) => {
                setUserInfo(order.user);
                setPaymentMethod(order.paymentMethod);
                order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
                order.isDelivered ? setIsDelivered(order.deliveredAt) : setIsDelivered(false);
                setCartSubtotal(order.orderTotal.cartSubtotal);
                if(order.isDelivered){
                    setOrderButtonMessage('Order is finished');
                    setButtonDisabled(true);
                }
                setCartItems(order.cartItems);
            })
            .catch(err => console.log(err.response.data.message ? err.response.data.message : err.response.data))
    }, [isDelivered, id]);

    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Order details</h1>
                <Col md={8}>
                    <br />
                    <Row>

                        <Col>
                            <h2>Shipping</h2>
                            <b>Name: </b> {userInfo.name} {userInfo.lastName} <br />
                            <b>Adress: </b> {userInfo.address} {userInfo.city} {userInfo.country} {userInfo.zipCode} <br />
                            <b>Phone: </b> {userInfo.phoneNumber} <br />
                        </Col>

                        <Col>
                            <h2>Payment method</h2>
                            <Form.Select value={paymentMethod} disabled={true}>
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
                                <Alert className="mt-3" variant={isDelivered ? "success" : "danger"}>
                                    {isDelivered ? <>Delivered at {isDelivered}</> : <>Not delivered</>}
                                </Alert>
                            </Col>

                            <Col>
                                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                                    {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}
                                </Alert>
                            </Col>
                        </Row>

                    </Row>
                    <br/>

                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item,idx) => (
                            <CartItemComponent key={idx} item={item} orderCreated={true} />
                        ) )}
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Oder summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Items price (after tax): <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className="fw-bold">Included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Tax: <span className="fw-bold">Included</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-danger">
                            Total price: <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button 
                                    size="lg"
                                    onClick={() => 
                                        markAsDelivered(id)
                                        .then((res) => {
                                            if(res){
                                                setIsDelivered(true);
                                            }
                                        })
                                        .catch(err => err.response.data.message ? err.response.data.message : err.response.data)
                                    }
                                    disabled={buttonDisabled} 
                                    variant="primary" 
                                    type="button"
                                >
                                    {orderButtonMessage}
                                </Button>
                            </div>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderDetailsPageComponent;