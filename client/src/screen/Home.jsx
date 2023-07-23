import React, { useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

import BestDeals from '../compenets/BestDeals'
import ClassfiedProducts from '../compenets/ClassfiedProducts'
import NewsletterBox from '../compenets/NewsletterBox'

import Carousals from '../compenets/Carousals'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/action/productAction'
import ProductCarousal from '../compenets/ProductCarousal'


const Home = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList


  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch])
  return (

    <main>


      <Carousals />

      <BestDeals products={products} />
    

      <ProductCarousal products={products}/>
      
      <NewsletterBox />

    </main>


  )
}

export default Home