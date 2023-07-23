import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faEnvelope, faHeart, faMagnifyingGlass, faUsd, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { logout } from '../redux/action/userActions';
function Header() {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Container>
            <Navbar expand="lg" >
                <Container fluid>
                    <Navbar.Brand>
                        <Link to={"/"}><Image className='brandlogo' src={"https://res.cloudinary.com/dkjzzkcls/image/upload/v1689658791/logo-6_2_wlirjz.png"} /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >


                            <Dropdown>
                                <Dropdown.Toggle variant='red' className='dropdown' id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form className="d-flex ms-3">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className='border-0 searchBar'
                                    aria-label="Search"

                                />
                                <Button className='searchBarBtn' variant="ligh">
                                    <FontAwesomeIcon className='text-primary' icon={faMagnifyingGlass} />
                                </Button>
                            </Form>

                        </Nav>
                        
                        <Nav.Link >
                            <FontAwesomeIcon icon={faHeart} />
                        </Nav.Link>
                        <Nav.Link className='ms-3'  >
                        <LinkContainer to={'/cart'}>
                        <FontAwesomeIcon icon={faBasketShopping} />
                        </LinkContainer>
                            
                        </Nav.Link>
                        <Nav.Link className='ms-3'  >
                            <FontAwesomeIcon icon={faUserAlt} />
                        </Nav.Link>

                        {userInfo ? (
                            <NavDropdown className='ms-2' title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user ms-2'></i> Log in
                                </Nav.Link>
                            </LinkContainer>
                        )} {userInfo && userInfo.isAdmin && (
                            <NavDropdown className='ms-2' title="ADMIN" id='adminmenu'>
                                <LinkContainer to='/admin/userList'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/createProduct'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderList'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>

                            </NavDropdown>
                        )}
                        <Button
                            variant=''
                            className='ms-5 px-4 py-2 headerButton text-light' >
                            Classifilds
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>

    );
}



export default Header