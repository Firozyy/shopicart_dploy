
import { LinkContainer } from "react-router-bootstrap";

import React, { useEffect, } from 'react'
import { useNavigate } from "react-router-dom"
import { Row, Col, Button, Table, Container, Spinner, } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';

import Message from '../compenets/Message';
import { listProducts, productCreate, productDelete } from "../redux/action/productAction";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList
    // const { products, page, pages } = data

    const { userInfo } = useSelector(state => state.userLogin)
    const { success: successDelete, error: errorDelete, loading: loadingDelete } = useSelector(state => state.productDelete)
    const { success: successCreate, error: errorCreate, loading: loadingCreate, product: cretedProduct } = useSelector(state => state.productCreate)

    useEffect(() => {
        dispatch({ type: "PRODUCT_Create_RESET" })
        if (!userInfo.isAdmin) {
            navigate("/login")

        }
        else {
            dispatch(listProducts())
        }

    }, [dispatch, navigate, userInfo, successDelete, cretedProduct])

    const deleteHandler = (id) => {
        dispatch(productDelete(id))
    }

    const createProductHandler = () => {
        navigate("/admin/createProduct")
    }
console.log();
    return (
        <Container className="screenSize">
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}


            {loading || loadingCreate ? <Spinner animation="border" variant="secondary" size="sm" /> : error ? <Message variant={'danger'}>{error}</Message> : (
                <Table striped hover responsive bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATAGORY</th>
                            <th>BRAND</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(item => (

                            <tr key={item._id}>

                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.catagory}</td>
                                <td>{item.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${item._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                        <EditIcon />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(item._id)}
                                        disabled={loadingDelete}
                                    >
                                        {loadingDelete ? <Spinner animation="border" variant="secondary" size="sm" /> : <DeleteOutlineIcon />}

                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}



export default ProductListScreen