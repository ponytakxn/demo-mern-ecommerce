import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Alert, ListGroup, Button } from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useNavigate } from 'react-router-dom';

const UserCartDetailsPageComponent = ({ cartItems, itemsCount, cartSubtotal, reduxDispatch, addToCart, removeFromCart, getUser, userInfoFromRedux,
                                        createOrder }) => {
    const [user, setUser] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [missingAddress, setMissingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('pp');

    const navigate = useNavigate();

    const userInfo = userInfoFromRedux;

    const changeCount = (productID, count) => {
        reduxDispatch(addToCart(productID, count));
    }

    const removeFromCartHandler = (productID, quantity, price) => {
        if (window.confirm('Are you sure?')){
            reduxDispatch(removeFromCart(productID, quantity, price));
        }
    }

    const orderHandler = () => {
        const orderData = {
            orderTotal: {
                itemsCount: itemsCount,
                cartSubtotal: cartSubtotal
            },
            cartItems: cartItems.map(item => {
                return{
                    _id: item.productID,
                    name: item.name,
                    price: item.price,
                    image: { path: item.image ? (item.image.path ?? null) : null},
                    quantity: item.quantity,
                    count: item.count
                }
            }),
            paymentMethod: paymentMethod,
        }

        createOrder(orderData)
            .then(data=>{
                if(data){
                    console.log(data);
                    navigate(`/user/order-details/${data._id}`);
                }
            })
            .catch(err => console.log(err));
    }

    const choosePayment = (e) => {
        setPaymentMethod(e.target.value);
    }

    useEffect(() => {
        getUser(userInfo._id)
            .then((data)=> {
                setUser(data);
                if (!data.address || !data.city || !data.country || !data.zipCode || !data.phoneNumber){
                    setButtonDisabled(true);
                    setMissingAddress(`. In order to make order, fill out all your information on profile's page`);
                }else{
                    setMissingAddress(false);
                }
            })
            .catch(err=>err.response.data.message ? err.response.data.message : err.response.data)
    }, [userInfo._id]);


    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Cart details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col>
                            <h2>Shipping</h2>
                            <b>Name: </b>{user.name} {user.lastName}<br />
                            <b>Adress: </b> {user.address}, {user.city}, {user.country}, ZipCode: {user.zipCode} <br />
                            <b>Phone: </b> {user.phoneNumber} <br />
                        </Col>

                        <Col>
                            <h2>Payment method</h2>
                            <Form.Select onChange={choosePayment}>
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
                                    Not delivered {missingAddress}
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">
                                    Not paid yet
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br/>

                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item,idx) => (
                            <CartItemComponent item={item} key={idx} removeFromCartHandler={removeFromCartHandler} changeCount={changeCount} />
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
                                    disabled={buttonDisabled}
                                    onClick={orderHandler} 
                                    size="lg" 
                                    variant="danger" 
                                    type="button">
                                    Place order
                                </Button>
                            </div>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default UserCartDetailsPageComponent;