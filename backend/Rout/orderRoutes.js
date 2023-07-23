import express from "express";
import { addOederItems, getOrderById, updateOrderToPaid, allOrders, getOrders, updateOrderToDeliverd } from "../controler/orderControler.js";
import { adminMidleware, protect } from "../midlewares/authMidleware.js";
import { paymentverification, checkout, } from "../controler/paymantControler.js"

const router = express.Router();
router.route('/order/updateorder').put(protect, updateOrderToPaid);
router.route('/orders').post(protect, addOederItems)
router.route('/order/:id').get(protect, getOrderById)


router.route('/checkout').post(checkout);
router.route('/paymentverification/:id').post(paymentverification);
router.route('/orders/allOrders').get(protect, allOrders);
router.route('/orders/getallOrders').get(protect,adminMidleware,getOrders)

router.route('/order/delivered/:id').put(protect,adminMidleware, updateOrderToDeliverd);


export default router