import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
const ProductCarousal = ({ products }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (

        <Container>
            <h4 className='text-dark'>Exclusive Deals</h4>
            <Carousel responsive={responsive}>
                { products && products.map(item => (


                    <Card className='border-0 card' style={{ width: '16rem' }}>
                        <Link to={`/product/${item._id}`}>
                            <Card.Img className="carousalimage" variant="top" src={item.image.image_url} />
                        </Link>

                        <Card.Body>

                            <Card.Text >
                                <b> {item.name}</b>
                            </Card.Text>
                            <p className='text-primary'>{item.price}</p>
                        </Card.Body>
                    </Card>



                ))}


            </Carousel>
        </Container>


    )
}

export default ProductCarousal



