import React from 'react'
import { Container, Dropdown } from 'react-bootstrap'

const Catagories = () => {
    return (
        <Container>
            <div className='catagories'>
                <div>
                    <Dropdown >
                        <Dropdown.Toggle variant='red' className='catagoriesDrop' id="dropdown-basic">
                            Catagories
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='ms-3'>
                    <ul className='m-0 p-0'>

                        <li>Books</li>
                        <li>Electronics</li>
                        <li>Reeal estate</li>
                        <li>Car Bikes</li>
                        <li>Dor -m furniture</li>
                        <li>Men</li>
                        <li>Women</li>
                        <li>Music</li>
                        <li>Hobbies games</li>
                        <li>Toys</li>
                        <li>kids</li>
                    </ul>
                </div>

            </div>
        </Container>

    )
}

export default Catagories