import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Container, Image, Row, Form } from 'react-bootstrap'


const NewsletterBox = () => {
    const submithandler = () => { }
    return (
        <div className='bg-primary'>
            <Container>
                <Row className='bg-primary text-light blueBox'>
                    <Col md={2}>
                        <Image src='https://res.cloudinary.com/dkjzzkcls/image/upload/v1689609002/Vector_woyxud.png' />
                    </Col>
                    <Col md={5}>
                        <div><h3>Sign Up for Newsletter</h3></div>
                        <div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>
                    </Col>
                    <Col className='newsletterbox'>
                        <Form className='newsletterboxForm'>
                          
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                               
                                <Form.Control className='newsletterboxInput' type="email" placeholder="Enter email" />

                            </Form.Group>
                         
                        
                            <Button  className="newsletterboxFormButton" variant="red" type="submit">
                                Submit
                            </Button>
                            
                       


                           
                        </Form>
                    </Col>



                </Row>
            </Container>
        </div>
    )
}

export default NewsletterBox