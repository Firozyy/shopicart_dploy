import express from "express";
import { createProduct, deletproduct, getProduct, getProducts, updateProdut, createProductReview, searchProducts, getTopProducts } from "../controler/productControler.js";
import { adminMidleware, protect } from "../midlewares/authMidleware.js";
import singleUpload from "../midlewares/multer.js";

const router = express.Router();


router.route('/products').get(getProducts).post(protect, adminMidleware, singleUpload, createProduct);
router.route('/products/searach').get(searchProducts)

router.route('/:id').get(getProduct)
    .delete(protect, adminMidleware, deletproduct)
    .put(protect, adminMidleware, singleUpload, updateProdut)

router.route('/products/:id/reviews').post(protect, createProductReview);

router.route('/products/top').get(getTopProducts)
export default router