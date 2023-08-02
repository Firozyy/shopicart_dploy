
import FormContainer from '../compenets/FormContainer'
import React, { useEffect, useState, } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, FormLabel, FormControl, Spinner, } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';

import Message from '../compenets/Message';
import { listProductsDetails, productUpdate } from '../redux/action/productAction';


const ProdictEditScreen = () => {
    const { loading, error, product } = useSelector(state => state.productDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successupdate } = useSelector(state => state.productUpdate)


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

    // const redirect = location.search ? location.search.split("=")[1]:"/"

    const dispatch = useDispatch()


    useEffect(() => {
        if (successupdate) {
            dispatch({ type: "PRODUCT_UPDATE_RESET" })
            navigate("/admin/productList")
        }
        else {
            if (!product.name || product._id !== id) {
                dispatch(listProductsDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setImage(product.image)
                setcatagory(product.category)
                setcountInStock(product.countInStock)
                setdescription(product.description)
                setnumReviews(product.numReviews)

            }
        }

    }, [dispatch, product, successupdate, id])

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

        //updateb product handler


        dispatch(productUpdate(myForm, id))

    }
    return (
        <>

            <FormContainer >
                <Link to={'/admin/productList'} className='btn btn-light my-3'>
                    GO BACK
                </Link>
                <h1>Update Product</h1>

                {loadingUpdate && <Spinner animation="border" variant="secondary" size="sm" />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Spinner animation="border" variant="secondary" size="sm" /> : error ? <Message variant='danger'>{error}</Message> : (
                    <>
                        <Form onSubmit={formSubmitHandler}>
                            <FormGroup controlId='name'>
                                <FormLabel>Name</FormLabel>
                                <FormControl type='text' placeholder='Enter new product name' value={name}
                                    onChange={(e) => setName(e.target.value)}  >
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId='price'>
                                <FormLabel>Price</FormLabel>
                                <FormControl type='number' placeholder='Enter new price' value={price}
                                    onChange={(e) => setPrice(e.target.value)}  >
                                </FormControl>
                            </FormGroup>

                            <FormGroup controlId='brand'>
                                <FormLabel>brand</FormLabel>
                                <FormControl type='text' placeholder='Enter new Brand name' value={brand}
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
                                <FormControl type='text' placeholder='Enter new category' value={category}
                                    onChange={(e) => setcatagory(e.target.value)}  >
                                </FormControl>
                            </FormGroup>


                            <FormGroup controlId='description'>
                                <FormLabel>description</FormLabel>
                                <FormControl type='text' placeholder='Enter new description' value={description}
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
                            <Button type='submit' variant='primary'>update</Button>
                        </Form>

                    </>
                )}

            </FormContainer>
        </>

    )
}






export default ProdictEditScreen