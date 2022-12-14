import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Alert, ListGroup, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useParams } from 'react-router-dom';

const UserOrderDetailsPageComponent = ({ userInfo, getUser, getOrder }) => {

    const [user, setUser] = useState({});
    const [orderButtonMessage, setOrderButtonMessage] = useState('Pay for the order');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [cartSubtotal, setCartSubtotal] = useState(0);

    const { id } = useParams();

    const orderHandler = () => {
        setButtonDisabled(true);
        if (paymentMethod === 'pp'){
            setOrderButtonMessage('To pay for your order click one of the buttons below');
            if (!isPaid){
                //to do: load PayPal script an do actions
            }
        }else{
            setOrderButtonMessage('Your order was placed. Thak you.')
        }
    }

    useEffect(() => {
        getUser(userInfo._id)
            .then(data => setUser(data))
            .catch(err => err.response.data.message ? err.response.data.message : err.response.data );
    }, []);

    useEffect(() => {
        getOrder(id)
            .then(data => {
                setPaymentMethod(data.paymentMethod);
                setCartItems(data.cartItems);
                setCartSubtotal(data.orderTotal.cartSubtotal);
                data.isDelivered ? setIsDelivered(data.deliveredAt) : setIsDelivered(false);
                data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
                if(data.isPaid){
                    setOrderButtonMessage('Your order is finished');
                    setButtonDisabled(true);
                }else{
                    if(data.paymentMethod==='pp'){
                        setOrderButtonMessage('Pay for your order');
                    }else if(data.paymentMethod==='cod'){
                        setButtonDisabled(true);
                        setOrderButtonMessage('Wait for your order. You pay on delivery');
                    }
                }
            })
            .catch(err => err.response.data.message ? err.response.data.message : err.response.data);
    }, []);

    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Order details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col>
                            <h2>Shipping</h2>
                            <b>Name: </b> {user.name} {user.lastName} <br />
                            <b>Adress: </b> {user.address}, {user.city}, {user.country}, Zip Code: {user.zipCode} <br />
                            <b>Phone: </b> {user.phoneNumber} <br />
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
                                <Alert className="mt-3" variant={isDelivered ? 'success' : 'danger'}>
                                    {isDelivered ? <>Delivered at {isDelivered} </> : <>Not delivered</>}
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant={isPaid ? 'success' : 'danger'}>
                                    {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br/>

                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item,idx) => (
                            <CartItemComponent item={item} key={idx} orderCreated={true} />
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
                                <Button size="lg" onClick={orderHandler} variant="danger" type="button" disabled={buttonDisabled}>
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

export default UserOrderDetailsPageComponent;