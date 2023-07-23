

import FormContainer from '../compenets/FormContainer'
import React, { useState, } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Form, Container, FormGroup, FormLabel, FormControl, } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../redux/action/cartAction';


const ShippingScreen = () => {
    const { shippingAddress } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
    const [country, setcountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }
    return (
        <Container className='screenSize'>

            <FormContainer>



                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='address'>
                        <FormLabel>Address</FormLabel>
                        <FormControl
                            required
                            type='text'
                            placeholder='Enter your address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}  >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='city'>
                        <FormLabel>City</FormLabel>
                        <FormControl
                            required
                            type='text'
                            placeholder='Enter your city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}  >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='postalCode'>
                        <FormLabel>postalCode</FormLabel>
                        <FormControl
                            required
                            type='number'
                            placeholder='Enter your postalCode'
                            value={postalCode}
                            onChange={(e) => setpostalCode(e.target.value)}  >
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId='country'>
                        <FormLabel>country</FormLabel>
                        <FormControl
                            required
                            type='text'
                            placeholder='Enter your country'
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}  >
                        </FormControl>
                    </FormGroup>
                    <Button type='submit' variant='primary'>
                        continue
                    </Button>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default ShippingScreen