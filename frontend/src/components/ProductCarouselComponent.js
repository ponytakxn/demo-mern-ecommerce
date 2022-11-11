import Carousel from 'react-bootstrap/Carousel';
import { LinkContainer } from 'react-router-bootstrap';

const ProductCarouselComponent = () => {
    
    const cursorP = {
        cursor: "pointer"
    }

    return (
        <Carousel>
        <Carousel.Item>
            <img
                crossOrigin="anonymous"
                className="d-block w-100"
                style={{height: "300px", objectFit: "cover"}}
                src="/images/carousel/carousel-1.png"
                alt="First slide"
            />
            <Carousel.Caption>
                <LinkContainer style={cursorP} to="/product-details">
                    <h3>First slide label</h3>
                </LinkContainer>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                style={{height: "300px", objectFit: "cover"}}
                src="/images/carousel/carousel-2.jpg"
                alt="Second slide"
            />

            <Carousel.Caption>
            <LinkContainer style={cursorP} to="/product-details">
                    <h3>Second slide label</h3>
                </LinkContainer>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                style={{height: "300px", objectFit: "cover"}}
                src="/images/carousel/carousel-3.jpg"
                alt="Third slide"
            />

            <Carousel.Caption>
            <LinkContainer style={cursorP} to="/product-details">
                    <h3>Third slide label</h3>
                </LinkContainer>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    );
}

export default ProductCarouselComponent;