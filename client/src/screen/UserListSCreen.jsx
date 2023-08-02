
import { LinkContainer } from "react-router-bootstrap";

import React, { useEffect, useState, } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Button, Table, Container, Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';

import Message from '../compenets/Message';
import { dleteUser, userlist } from "../redux/action/userActions";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const UserListSCreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users, error, loading } = useSelector(state => state.userList)
    const { userInfo } = useSelector(state => state.userLogin)
    const { success } = useSelector(state => state.userRemove)


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(userlist())
        } else {
            navigate("/login")
        }


    }, [dispatch, success])

    const deleteHandler = (id) => {

        dispatch(dleteUser(id))
    }
    return (
        <Container className="screenSize"><h1>USERS</h1>
            {loading ? <Spinner animation="border" variant="secondary" size="sm" /> : error ? <Message variant={'danger'}>{error}</Message> : (
                <Table striped hover responsive bordered>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>ID</th>

                            <th>EMAIL</th>
                            <th>ADMIN</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user._id}</td>

                                <td><a href="">{user.email}</a></td>
                                <td>{user.isAdmin ? "ADMIN" : "USER"}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='primary' className='btn-sm'>
                                            <EditIcon />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <DeleteOutlineIcon />
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

export default UserListSCreen