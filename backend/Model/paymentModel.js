import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },

    createdAT: {
        type: Date,
        default: Date.now
    },
});


export const Payment = mongoose.model("Payment", schema)