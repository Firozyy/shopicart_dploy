import { instance } from "../server.js";
import asyncHandler from "express-async-handler"
import crypto from "crypto"
import { Payment } from "../Model/paymentModel.js"
export const checkout = asyncHandler(
    async (req, res) => {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    }
)


export const paymentverification = asyncHandler(async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const orderId = req.params.id


    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      
        // Database comes here

        await Payment.create({
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `https://shopicart-3v7e.onrender.com/paymentsuccess?reference=${orderId}`

            

        );
    } else {
        res.send('failed')
    }

})