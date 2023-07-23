import React, { useEffect, useState, } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Row, Col, Image, Container, ListGroup, Card, Button, Form, Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';

import Rating from '../compenets/Rating'


import Message from '../compenets/Message';
import { createProductReview, listProductsDetails } from '../redux/action/productAction';

const ProductScreen = () => {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const { id } = useParams()

  const dispatch = useDispatch()
  const { loading, product, error } = useSelector(state => state.productDetails)
  const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = useSelector(state => state.productReviewCreate)
  const { userInfo } = useSelector(state => state.userLogin)
  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({type:"PRODUCT_REVIEW_CREATE_RESET"})
    }
    dispatch(listProductsDetails(id))
  }, [dispatch, id,successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);

  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id,{rating,comment}))
    

  };

  

  return (
    <Container className='screenSize'>
      <Link to={'/'} className='btn btn-lighy my-3'>
        GoBack
      </Link>
      {loading && <Spinner animation="border" variant="secondary" size="sm"/>}
      {error && <Message variant={'danger'}>{error}</Message>}
      {product.image && (<>
        <Row>
          <Col md={6}>

            <Image src={product.image.image_url} alt={product.name} fluid />

          </Col>
          <Col md={3}>
            <ListGroup variant='flush' >
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  color={"red"}
                  value={product.rating}
                  text={`${product.numReviews} rewiews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Price:${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description:{product.description
                }
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush' >
                <ListGroup.Item>
                  <Row>

                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>

                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>

                    <Col>
                      Stock:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? product.countInStock : "Out of stock"}
                    </Col>

                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button

                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>

          </Col>
        </Row>
        <Row>
            <Col md={6}>
              <h6>Reviews</h6>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h6>Write a Customer Review</h6>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Spinner animation="border" variant="secondary" size="sm"/>}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
      </>)

      }


    </Container>

  )
}

export default ProductScreen