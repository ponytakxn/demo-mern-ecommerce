import { Col, Row, Container, Image, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import ImageZoom from 'js-image-zoom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductDetailsPageComponent = ({ addToCartReduxAction, reduxDispatch }) => {

    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);

    const addToCartHandler = () => {
        reduxDispatch(addToCartReduxAction(id, quantity));
    }

    var options = {
        width: 400,
        zoomWidth: 500,
       /*  fillContainer: true, */
        /* zoomPosition: "bottom", */
        scale: 2,
        offset: {vertical: 0, horizontal: 0}
    }

    useEffect(()=>{
        new ImageZoom(document.getElementById("first"), options)
        new ImageZoom(document.getElementById("second"), options)
        new ImageZoom(document.getElementById("third"), options)
        new ImageZoom(document.getElementById("fourth"), options)
    })
    
    return (
        <Container>
            <AddedToCartMessageComponent/>
            <Row className="mt-5">
                <Col style={{zIndex: 1}} md={4}>
                    <div id="first">
                        <Image fluid src="/images/games-category.png" />                        
                    </div>
                    <br />
                    <div id="second">
                        <Image fluid src="/images/monitors-category.png" />                        
                    </div>
                    <br/>
                    <div id="third">
                        <Image fluid src="/images/tablets-category.png" />                        
                    </div>
                    <br/>
                    <div id="fourth">
                        <Image fluid src="/images/carousel/carousel-1.png" />                        
                    </div>
                    <br/>                                        
                </Col>

                <Col md={8}>
                    <Row>
                        <Col md={8}>
                            <ListGroup>
                                <ListGroup.Item><h1>Product name</h1></ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating readonly size={20} initialValue={5}/>
                                </ListGroup.Item>
                                <ListGroup.Item>Price: <span className="fw-bold">$124</span></ListGroup.Item>
                                <ListGroup.Item>Description of the product blablabla</ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Status: in stock</ListGroup.Item>
                                <ListGroup.Item>Price: <span className="fw-bold">$124</span></ListGroup.Item>
                                <ListGroup.Item>
                                    Quantity
                                    <Form.Select 
                                        value={quantity} 
                                        onChange={e=>setQuantity(e.target.value)} 
                                        size="lg" 
                                        aria-label="Default select example">

                                        <option>choose</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button onClick={addToCartHandler} variant="success">Add to cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="mt-5">
                            <h5>REVIEWS</h5>
                            <ListGroup variant="flush">
                                {Array.from({length: 4}).map((item,idx) => (
                                    <ListGroup.Item key={idx}>
                                        User name <br />
                                        <Rating readonly size={20} initialValue={5}/> <br />
                                        Date of review <br />
                                        Text review blablabla
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <hr />

                            <Alert variant="danger">Login first to write a review</Alert>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Write your review</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Form.Select className="mb-2" size="md" aria-label="Default select example">
                                        <option>Your rating</option>
                                        <option value="1">5 (awesome)</option>
                                        <option value="2">4 (very good)</option>
                                        <option value="3">3 (good)</option>
                                        <option value="4">2 (bad)</option>
                                        <option value="5">1 (awful)</option>
                                </Form.Select>
                                <Button variant="primary">Send review</Button>
                            </Form>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
        </Container>
    )
};

export default ProductDetailsPageComponent;