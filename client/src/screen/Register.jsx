import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Form, Container, FormControl, FormGroup, FormLabel, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import Message from '../compenets/Message'
import { register } from '../redux/action/userActions';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, userInfo } = useSelector(state => state.userRegister)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setConfirmpassword] = useState("")
    const [message, setMessage] = useState(undefined)

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    useEffect(() => {
        if (userInfo) {
            return navigate("/")
        }
    }, [userInfo, navigate])
    return (
        <Container className="screenSize">
           
            <Row className='my-5'>
                <Col>
                    <Row className='justify-content-md-center'>


                        <Col xs={12} md={6}>
                            {message && <Message variant='danger'>{message}</Message>}
                            {error && <Message variant='danger'>{error}</Message>}
                            <Form onSubmit={formSubmitHandler}>
                                <FormGroup controlId='name'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl type='text' placeholder='Enter your name' value={name}
                                        onChange={(e) => setName(e.target.value)}  >
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId='email'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl type='email' placeholder='Enter your email' value={email}
                                        onChange={(e) => setEmail(e.target.value)}  >
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId='password'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl type='password' placeholder='Enter your password' value={password}
                                        onChange={(e) => setpassword(e.target.value)}  >
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId='confirmPassword'>
                                    <FormLabel>confirm Password</FormLabel>
                                    <FormControl type='confirmPassword' placeholder='confirmPassword your password' value={confirmPassword}
                                        onChange={(e) => setConfirmpassword(e.target.value)}  >
                                    </FormControl>
                                </FormGroup>
                                <Button type='submit' variant='primary'>
                                    {loading ? <Spinner animation="border" variant="secondary" size="sm" /> : "Sign In"}
                                </Button>
                            </Form>
                            <Row className='py-3'>
                                <Col>
                                    New Customer ? <Link to={'/login'}>login</Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>



            </Row>
        </Container>


    )
}

export default Register