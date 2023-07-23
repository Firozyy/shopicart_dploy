

import React, { useEffect, } from 'react'
import { Link, useNavigate, } from "react-router-dom"
import { Button, Row, Col, Container, ListGroup, ListGroupItem, Image, Card } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';

import Message from "../compenets/Message"
import { createOrder } from '../redux/action/orderActions';

const PlaceOrder = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart

    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    const itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 1000 ? 0 : 100)
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2)
    const { order, success, error } = useSelector((state) => state.orderCreate)

    const navigate = useNavigate()
    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }
    }, [navigate, success])



    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice
        }))
    };

    return (
        <Container>
          
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h5>Shipping</h5>
                            <p>
                                <strong>
                                    Address
                                </strong>
                                {shippingAddress.address},
                                {shippingAddress.city},
                                {shippingAddress.postalCode},
                                {shippingAddress.country},
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h5>Paymnet method</h5>

                            <strong>
                                Method:
                            </strong>
                            {paymentMethod}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h5>Order items</h5>

                            {cartItems.length === 0 ? <Message>Your cart is empty</Message> :
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
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
                                <h5>Order Summary</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrder