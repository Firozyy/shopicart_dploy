import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faBasketShopping, faDollar, faEnvelope, faHeart, faLocation, faLocationArrow, faMagnifyingGlass, faMessage, faPhone, faUsd, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row } from 'react-bootstrap'
import './style.css'
const TopNav = () => {
    return (

        <div className='bg-primary top_nav'>
            <Container>
                <Row className='bg-primary py-3 text-light '>
                    <Col className='topNavMain'>
                        <div className="topnavFirst">
                            <div> 
                                 <FontAwesomeIcon className='me-2' icon={faPhone} />
                                <span>+221 33 66 22</span>
                            </div>
                            <div className='ms-5'>
                                <FontAwesomeIcon className='me-2' icon={faEnvelope} />
                                <span>support@elextra.io</span>
                            </div>
                        </div>
                        <div className="topnavFirst">
                            <div> 
                                 <FontAwesomeIcon className='me-2' icon={faLocationArrow} />
                                <span >Location</span>
                            </div>
                            <div className='ms-5'>
                                <FontAwesomeIcon className='me-2' icon={faDollar} />
                                <span>Doller (US)</span>
                                <FontAwesomeIcon className='me-2' icon={faArrowDown} />
                            </div>
                        </div>

                    </Col>
                    


                </Row>
            </Container>
        </div>

    )
}

export default TopNav