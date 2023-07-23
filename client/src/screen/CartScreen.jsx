
import { React, useEffect } from 'react'
import { Row, Form, Col, ListGroup, Image, Button, Container, Card, ListGroupItem } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import { addtocart, removeFromCart } from '../redux/action/cartAction';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import Message from '../compenets/Message';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartScreen = () => {

  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.userLogin)
  const { cartItems } = useSelector(state => state.cart)

  const { id } = useParams()
  const { search } = useLocation()
  const qty = search ? Number(search.split('=')[1]) : 1

  const dispatch = useDispatch()


  useEffect(() => {
    if (id) {
      dispatch(addtocart(id, qty))
    }

  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) => {

    dispatch(removeFromCart(id))

  }

  const checkOutHandler = () => {
  
    if (!userInfo) {
      navigate("/login")
    }
    else {
      navigate("/shipping")
    }

  }
  return (
    <Container className='screenSize '>
      <Row>
        <Col md={8}>
          <h5 className='mt-3'>Shoping Cart</h5>
          {cartItems.length === 0 ? <Message>Your cart is Empty <Link to={'/'}>Go Back</Link></Message> :
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image.image_url} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link id='link' to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        className='text-center'
                        as='select'
                        value={item.qty}
                        onChange={(e) => dispatch(addtocart(item.product, (Number(e.target.value))))}
                      >
                        {[...Array(item.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                     <DeleteOutlineIcon/>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h5>Subtotal{cartItems.reduce((acc, item) => acc + item.qty, 0)} Items</h5>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type='button' className='btn-block w-100' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                  Proceed
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </Container>

  )
}

export default CartScreen


