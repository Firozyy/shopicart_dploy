import express from "express";
import Razorpay from 'razorpay'
import cloudinary  from "cloudinary";
import dbconnection from "./config/dbConeting.js";





dbconnection();
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.API_Key,
    
    api_secret: process.env.API_Secret
 });

export const instance = new Razorpay({
    key_id: process.env.Razorpay_APIkey_Key_Id,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

import app from "./app.js"
const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is up on ${port}`);
})

