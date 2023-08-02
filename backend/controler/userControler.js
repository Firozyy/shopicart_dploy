import User from "../Model/userModel.js"
import asyncHandler from "express-async-handler"
import { token } from "../utils/setnToken.js"


//login 
//http://localhost:8080/api/v1/user/login

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
//@desc login
// rout http://localhost:8080/api/v1/user/profile
// private
export const GetUserprofile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }


})
//@desc register
// rout http://localhost:8080/api/v1/user
// public

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('Already registered user')
    }

    const user = await User.create({
        name, email, password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token(user._id),

        })
    } else {
        res.status(400)
        throw new Error('registration failed')
    }
})

//@desc updateprofile
// rout http://localhost:8080/api/v1/user/profile/update
// private
export const updateUserprofile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
    }

    const updatedUser = await user.save()
    if (updatedUser) {
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,

        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }


})


//@desc get all users
// rout http://localhost:8080/api/v1/admin/users
// private/adminONLY

export const getUsers = asyncHandler(async (req, res) => {

    const user = await User.find()
    if (!user) {
        res.status(404)
        throw new Error('User Not Found')
    } else {
        res.json(user)
    }

})


//@desc deleteUser
// rout http://localhost:8080/api/v1/admin/user/:id
// private/adminONLY

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
  
    const user = await User.findById(id)
    if (!user) {
        res.status(404)
        throw new Error('User Not Found')
    } else {
        await await user.deleteOne({ id });
        res.json({
            message: 'user removed successfully'
        })
    }

})



//@desc getsingluser
// rout http://localhost:8080/api/v1/admin/user/:id
// private/adminONLY

export const getuserbyid = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).select("-password")
    if (!user) {
        res.status(404)
        throw new Error('User Not Found')
    } else {

        res.json(user)


    }

})



//@desc updateUsers
// rout http://localhost:8080/api/v1/admin/user/:id
// admib
export const updateUsers = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

    }

    const updatedUser = await user.save()
    if (updatedUser) {
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,

        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }


})