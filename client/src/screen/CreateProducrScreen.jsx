

import React, { useEffect, useState, } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, FormLabel, FormControl, Container, Row, Col, } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';


import Spinner from 'react-bootstrap/Spinner';
import Message from '../compenets/Message';
import { productCreate } from '../redux/action/productAction';


const CreateProducrScreen = () => {

    const { loading, success,error } = useSelector(state => state.productCreate)




    const { id } = useParams()
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setcatagory] = useState("")
    const [countInStock, setcountInStock] = useState(0)
    const [numReviews, setnumReviews] = useState(0)
    const [description, setdescription] = useState("")
    const [ImagePrev, setImagePrev] = useState('')
    const navigate = useNavigate()



    const dispatch = useDispatch()


    useEffect(() => {
        if (success) {

            navigate("/")
        }


    }, [success])

    const changeImageHnadler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const formSubmitHandler = (e) => {
        e.preventDefault()

        const myForm = new FormData();


        myForm.append("name", name)
        myForm.append("price", price)
        myForm.append("brand", brand)
        myForm.append("category", category)
        myForm.append("countInStock", countInStock)
        myForm.append("description", description)
        myForm.append("numReviews", numReviews)
        myForm.append("file", image);


        dispatch(productCreate(myForm))

    }
    return (
        <Container className='p-5'>
              <Link to={'/admin/productList'} className='btn btn-light my-3'>
                GO BACK
            </Link>
              <Row className='justify-content-md-center'>
              <Col xs={12} md={6}>
            
          
                <h1>Create product </h1>




                <>
                {error && <Message variant={'danger'}>{error}</Message>}
                    <Form onSubmit={formSubmitHandler}>
                        <FormGroup controlId='name'>
                            <FormLabel>Name</FormLabel>
                            <FormControl type='text' placeholder='product name' value={name}
                                onChange={(e) => setName(e.target.value)}  >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='price'>
                            <FormLabel>Price</FormLabel>
                            <FormControl type='number' placeholder='price' value={price}
                                onChange={(e) => setPrice(e.target.value)}  >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='brand'>
                            <FormLabel>brand</FormLabel>
                            <FormControl type='text' placeholder=' Brand name' value={brand}
                                onChange={(e) => setBrand(e.target.value)}  >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='image'>
                            <FormLabel>image</FormLabel>
                            <FormControl type='file'
                                onChange={changeImageHnadler}  >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='categoery'>
                            <FormLabel>categoery</FormLabel>
                            <FormControl type='text' placeholder='category' value={category}
                                onChange={(e) => setcatagory(e.target.value)}  >
                            </FormControl>
                        </FormGroup>


                        <FormGroup controlId='description'>
                            <FormLabel>description</FormLabel>
                            <FormControl type='text' placeholder=' description' value={description}
                                onChange={(e) => setdescription(e.target.value)}  >
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId='numReviews'>
                            <FormLabel>numReviews</FormLabel>
                            <FormControl type='text' value={numReviews}
                                onChange={(e) => setnumReviews(e.target.value)}  >
                            </FormControl>
                        </FormGroup>

                        <FormGroup controlId='countInStock'>
                            <FormLabel>countInStock</FormLabel>
                            <FormControl type='text' value={countInStock}
                                onChange={(e) => setcountInStock(e.target.value)}  >
                            </FormControl>
                        </FormGroup>
                        <Button className='createButton' type='submit' variant='primary' disabled={loading} >
                            {loading ? <Spinner animation="border" variant="secondary" size="sm"/>:"create"}
                            </Button>
                    </Form>

                </>

              </Col>
              </Row>
           
           
               
         
        </Container>

    )
}








export default CreateProducrScreen