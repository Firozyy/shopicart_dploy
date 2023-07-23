import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
    return (
        <Container>
            <Row className='pb-3'>
                <Col md={2}>
                    <div>
                        <Image className='w-100' src={"https://res.cloudinary.com/dkjzzkcls/image/upload/v1689658791/logo-6_2_wlirjz.png"} />
                    </div>
                    <div><p>ste architecto iure! Modi nesciunt voluptas, nobis beatae nostrum cum. Nulla?</p></div>
                    <div>
                        <Row>
                            <Col className='socialLogos p-3'>
                                <YouTubeIcon />
                                <LinkedInIcon />

                                <TwitterIcon />


                                <InstagramIcon />
                            </Col>

                        </Row>
                    </div>
                </Col>
                <Col md={2} className='mt-3'>
                    <div><b>QUICK LINKS</b></div>
                    <div className='mt-3 footerItems'><ul className='p-0 m-0'>
                        <li>Products</li>
                        <li>classifields</li>
                        <li>contact us</li>
                        <li>login</li>
                        <li>sign up</li>

                    </ul></div>
                </Col>
                <Col md={2} className='mt-3'>
                    <div><b>CUSTOMAT AREA</b></div>
                    <div className='mt-3 footerItems'><ul className='p-0 m-0'>
                        <li>My account</li>
                        <li>Oreder</li>
                        <li>Trending list</li>
                        <li>Terms</li>
                        <li>Privacy policy</li>
                        <li>My Cart</li>
                    </ul></div>
                </Col>
                <Col md={2} className='mt-3'>
                    <div><b>VENDER AREA</b></div>
                    <div className='mt-3 footerItems'><ul className='p-0 m-0'>
                        <li>partner with us</li>
                        <li>Training</li>
                        <li>Procedures</li>
                        <li>Terms</li>
                        <li>Privacy policy</li>

                    </ul></div>
                </Col>
                <Col md={4} className='mt-3'>
                    <div ><b>Contact Us</b></div>
                    <div className='mt-3 footerItems'>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className='footer_Hvaany' style={{ display: "flex" }}>
                                <div>
                                    <Image src='https://res.cloudinary.com/dkjzzkcls/image/upload/v1689661827/Vector_1_noojus.png' />
                                </div>
                                <div className='ms-3'  >
                                    <p className='m-0'>Have any question?</p>
                                    <p>+ 123 456 789</p>
                                </div>

                            </div>
                            <div className='ms-5'>
                                <Button className='px-4 font-weight-bold text-primary border-primary' variant='light'>Chat</Button>
                            </div>
                        </div>
                        <div className='mt-2' style={{ display: "flex" }}>
                            <div>
                                <Image className='w-100' src='https://res.cloudinary.com/dkjzzkcls/image/upload/v1689663293/appStore_p3rsus.png' />
                            </div>
                            <div className='ms-2'>
                                <Image className='w-100' src='https://res.cloudinary.com/dkjzzkcls/image/upload/v1689663293/appStore_p3rsus.png' />

                            </div>

                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer