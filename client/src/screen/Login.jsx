import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'

import { Link, useNavigate } from 'react-router-dom'
import Message from '../compenets/Message'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/action/userActions'


const Login = () => {
  const { loading, error, userInfo } = useSelector(state => state.userLogin)
  const [password, setpassword] = useState("")
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
        return navigate("/")
    }
}, [userInfo,navigate])


const formSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))

}

  return (
    <Container className="screenSize">
      
      <Row className='my-5'>
        <Col>


          <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
            
              {error && <Message variant='danger'>{error}</Message>}
              <Form onSubmit={formSubmitHandler}>
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
                <Button type='submit' variant='primary'>Sign In</Button>
              </Form>
              <Row className='py-3'>
                <Col>
                  New Customer ? <Link to={'/register'}>Regiter</Link>
                </Col>
              </Row>
            </Col>
          </Row>






        </Col>

      </Row>

    </Container>
  )
}

export default Login