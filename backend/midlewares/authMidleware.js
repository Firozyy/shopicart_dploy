import asyncHandler from "express-async-handler"

import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authrization && req.headers.authrization.startsWith("Bearer ")) {
        try {
            token = req.headers.authrization.split(" ")[1]
            const decoded = jwt.decode(token, process.env.JwtKey)


            req.user = await User.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            res.status(401)
            throw new Error("authrisation fail")
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("no authrisation")
    }


});


export const adminMidleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error("admin access only")
    }
}