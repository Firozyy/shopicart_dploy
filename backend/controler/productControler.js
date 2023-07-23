import Product from "../Model/ProductModel.js"
import asyncHandler from "express-async-handler"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"
import { query } from "express";

//@desc getallproducts
// routhttp://localhost:8080/api/v1/products
// public
export const getProducts = asyncHandler(
  async (req, res) => {

    const products = await Product.find()

    res.json( products )

  })


//@desc searchproducts
// routhttp://localhost:8080/api/v1/products
// public
export const searchProducts = asyncHandler(
  async (req, res) => {

    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
      : {}



    const products = await Product.find({ ...keyword })
    return res.json(products)



  })

//@desc getproductbyId
// http://localhost:8080/api/v1/ID
// private
export const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id)

  if (!products) {
    res.status(404)
    throw new Error('Product not found')

  }
  res.json(products)

})

//@desc deletproduct
// http://localhost:8080/api/v1/ID
// admin
export const deletproduct = asyncHandler(async (req, res) => {




  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) {
    res.status(404)
    throw new Error('product Not Found')
  } else {
    await await product.deleteOne({ id });
    res.json({
      message: 'product removed successfully'
    })
  }

})



//@desc createProduct
// http://localhost:8080/api/product
// admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,

    brand,
    category,
    countInStock,
    description,
  } = req.body

  if (!name || !price || !brand || !category || !countInStock || !description) {
    res.status(404)
    throw new Error("please fill  all fields")
  }

  const fileUri = getDataUri(req.file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);


  const product = new Product({
    name,
    price,
    user: req.user._id,
    image: {
      public_id: mycloud.public_id,
      image_url: mycloud.secure_url
    },
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
  })

  const cratedProduct = await product.save()

  res.status(201).json(cratedProduct)


})


//@desc updateProdut
// http://localhost:8080/:id
// admin
export const updateProdut = asyncHandler(async (req, res) => {

  const { name, price, description, brand, category, countInStock } = req.body

  const product = await Product.findById(req.params.id)
  const file = (req.file);



  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await cloudinary.v2.uploader.destroy(product.image.public_id);
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = {
      public_id: mycloud.public_id,
      image_url: mycloud.secure_url
    },
      product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("product not found")
  }

  const cratedProduct = await product.save()

  res.status(201).json(cratedProduct)


})


//@desc createReviews
// http://localhost:8080/products/:id/reviews
// useronly
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})



//@desc fetch top product 
// http://localhost:8080/products/top
// public
export const getTopProducts = asyncHandler(async (req, res) => {


  const product = await Product.find().sort({ rating: -1 }).limit(2)
  res.status(201).json(product)


})