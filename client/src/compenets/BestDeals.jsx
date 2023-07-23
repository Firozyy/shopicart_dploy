import { Rating } from '@mui/material';
import React from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const BestDeals = ({ products }) => {
    console.log(products);
    return (
        <Container  >
            <Row className='mt-5 p-5 '>
                <div className='text-dark mt-3 mb-5' style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4 className='text-dark' >Top Deals</h4>
                    <h5 >Best deals</h5>
                </div>

                {products && products.map(item => (
                    <Col className='bestDealmain mb-4' md={3}>

                        <div className='bestDealimg'>
                            <Link to={`/product/${item._id}`}>
                                <Image className='w-100' src={item.image.image_url} />
                            </Link>

                        </div>
                        <div className='ms-3'>
                            <div><p>{item.name}</p></div>
                            <div>  <span className='text-primary'><b>${item.price}</b></span></div>
                            <div>
                                <Rating

                                    name="simple-controlled"
                                    value={item.rating}
                                    className='rating'
                                />
                            </div>



                        </div>
                    </Col>
                ))}



            </Row>
        </Container>



    )
}

export default BestDeals