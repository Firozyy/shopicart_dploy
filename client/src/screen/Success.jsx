
import React, { useEffect } from 'react'
import { Card, Col, Container, Image, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from "react-router-dom"
import { getorderDetails, payOrder } from '../redux/action/orderActions'
import Message from '../compenets/Message'

import { removeFromCart } from '../redux/action/cartAction'

const Success = () => {
    const dispatch = useDispatch()
    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    useEffect(() => {
       if(!successPay){
        dispatch(payOrder(referenceNum))
        dispatch(getorderDetails(referenceNum))
       }
       


        
    

     }, [dispatch, referenceNum, order])




   


    return (
        <Container className='screenSize'>
            {loading ? <Spinner animation="border" variant="secondary" size="sm"/> : error ? <Message variant="dander">{error}</Message> :

                <>

                    <h5 className='text-success'>Paymant success {order._id}</h5>

                    <h5>ORDER PLACED</h5>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h6>shipping</h6>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>{' '}
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>
                                            Address
                                        </strong>
                                        {order.shippingAddress.address},
                                        {order.shippingAddress.city},
                                        {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country},
                                    </p>

                                </ListGroupItem>


                                <ListGroupItem>
                                    <h6>Order items</h6>

                                    {order.orderItems.length === 0 ? <Message>Order is empty</Message> :
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroupItem key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image.image_url} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col >
                                                            <Link id='link' to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4} >
                                                            {item.qty} * ${item.price} = {item.qty * item.price}
                                                        </Col>



                                                    </Row>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    }

                                </ListGroupItem>
                            </ListGroup>

                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h6>Order Summary</h6>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>₹{order.totalPrice - order.shippingPrice - order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>₹{order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>₹{order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>₹{order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>


                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            }

        </Container>
    )
}


export default Success


