import { Height } from '@mui/icons-material'
import React from 'react'
import { Carousel, Container, Image } from 'react-bootstrap'

const Carousals = () => {
    return (
        <Container>
            <Carousel className='carousal' >

                <Carousel.Item>
                    <Image className='w-100 rounded-3' src='https://res.cloudinary.com/dkjzzkcls/image/upload/v1689665723/Untitled_2_bqyi15.png' />

                </Carousel.Item>

            </Carousel>
        </Container>

    )
}

export default Carousals