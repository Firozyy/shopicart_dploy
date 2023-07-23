import Order from "../Model/OrderModel.js"
import asyncHandler from "express-async-handler"
import { Payment } from "../Model/paymentModel.js";
import Product from "../Model/ProductModel.js";


//@desc CreateNewOrder
// rout http://localhost:8080/api/v1/orders
// private
export const addOederItems = asyncHandler(async (req, res) => {
    const { orderItems,
        paymentMethod,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order Items")

    } else {
        const createdOrder = await Order.create({
            orderItems,
            user: req.user._id,
            paymentMethod,
            shippingAddress,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })


        res.status(201).json(
            createdOrder
        )
    }



})


//@desc CreateNewOrder
// rout http://localhost:8080/api/v1/order/:id
// private

export const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', "name email")

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("order not found")
    }

})


//@desc updateOrdertopaid
// rout put =http://localhost:8080/api/v1/order/updateorder
// private

export const updateOrderToPaid = asyncHandler(async (req, res) => {

    const { orderId } = (req.body);

    const order = await Order.findById(orderId)
    const paymant = await Payment.findOne({ orderId })

    order.orderItems.map(async (item) => {

        const product = await Product.findOne(item.product)
        product.countInStock = product.countInStock - item.qty

        const updatedproduct = await product.save()
    })



    if (order && paymant) {
        order.isPaid = true,
            order.paidAt = paymant.createdAT

        const updatedorder = await order.save()
        res.json(updatedorder)


    } else {
        res.status(404)
        throw new Error("order not found")
    }

})

//@desc get loged user all orders
// rout http://localhost:8080/api/v1/orders/allOrders
// private


export const allOrders = asyncHandler(async (req, res) => {
    const logedUserId = req.user._id

    const order = await Order.find({ user: logedUserId });
    res.json(order)
})


//@desc get  admin all orders
// rout http://localhost:8080/api/v1/orders/allOrders
// admin


export const getOrders = asyncHandler(async (req, res) => {


    const orders = await Order.find().populate("user", "id name")
    res.send(orders)
})

//@desc updateOrdertoDelivered
// rout put =http://localhost:8080/api/v1/order/delivered/:id
// private

export const updateOrderToDeliverd = asyncHandler(async (req, res) => {

    const { id } = (req.params);

    const order = await Order.findById(id)


    if (order) {
        order.isDelivered = true,
            order.deliverdAt = Date.now()

        const updatedorder = await order.save()
        res.json(updatedorder)


    } else {
        res.status(404)
        throw new Error("order not found")
    }

})