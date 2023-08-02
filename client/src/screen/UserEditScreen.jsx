
import FormContainer from '../compenets/FormContainer'
import React, { useEffect, useState, } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, FormLabel, FormControl, FormCheck, Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';

import Message from '../compenets/Message';
import { getUserDeatils, updateUser } from '../redux/action/userActions';


const UserEditScreen = () => {
    const { id } = useParams()
    const { loading, error, user } = useSelector(state => state.userDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.usersUpdate)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [isAdmin, setisAdmin] = useState(false)
    const navigate = useNavigate()

    // const redirect = location.search ? location.search.split("=")[1]:"/"

    const dispatch = useDispatch()


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: "USER_UPDATE_RESET" })
            navigate("/admin/userList")
        } else {
            if (!user.name || user._id !== id) {
                dispatch(getUserDeatils(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setisAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user.name, user._id, , user.email, id, user.isAdminsuccessUpdate, navigate])



    const formSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, name, email, isAdmin }))
    }
    return (
        <>

            <FormContainer >
                <Link to={'/admin/userList'} className='btn btn-light my-3'>
                    GO BACK
                </Link>
                <h1>Update use</h1>


                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Spinner animation="border" variant="secondary" size="sm" /> : error ? <Message variant='danger'>{error}</Message> : (
                    <>
                        <Form onSubmit={formSubmitHandler}>
                            <FormGroup controlId='name'>
                                <FormLabel>Name</FormLabel>
                                <FormControl type='text' placeholder='Enter your name' value={name}
                                    onChange={(e) => setName(e.target.value)}  >
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId='email'>
                                <FormLabel>Email</FormLabel>
                                <FormControl type='email' placeholder='Enter your email' value={email}
                                    onChange={(e) => setEmail(e.target.value)}  >
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId='isAdmin'>

                                <FormCheck checked={isAdmin} type='checkbox' label='isAdmin'

                                    onChange={(e) => setisAdmin(e.target.checked)}  >
                                </FormCheck>
                            </FormGroup>

                            <Button type='submit' variant='primary' disabled={loadingUpdate} >
                                {loadingUpdate ? <Spinner animation="border" variant="secondary" size="sm" /> : "update"}</Button>
                        </Form>

                    </>
                )}

            </FormContainer>
        </>

    )
}





export default UserEditScreen