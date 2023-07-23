import React from 'react'
import { BrowserRouter as Roter, Routes, Route } from "react-router-dom";
import Home from './screen/Home';
import Login from './screen/Login';
import Register from './screen/Register';
import Header from './compenets/Header';
import Catagories from './compenets/Catagories';
import TopNav from './compenets/TopNav';
import Footer from './compenets/Footer';
import ProductScreen from './screen/ProductScreen';
import CreateProducrScreen from './screen/CreateProducrScreen';
import Notfound from './screen/Notfound';
import CartScreen from './screen/CartScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from "./screen/PaymentScreen"
import PlaceOrder from './screen/PlaceOrder';
import OrderScreen from './screen/OrderScreen';
import Success from './screen/Success';

const App = () => {
  return (
    <Roter>
      <TopNav />
      <Header />
      <Catagories />
      <Routes>
        <Route path='*' element={<Notfound />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:id' element={<ProductScreen />} exact />
        <Route path='/cart/:id?' element={<CartScreen />} exact />
        <Route path='/admin/createProduct' element={<CreateProducrScreen />} exact />
        <Route path='/shipping' element={<ShippingScreen />} exact />
        <Route path='/payment' element={<PaymentScreen />} exact />
        <Route path='/placeOrder' element={<PlaceOrder />} exact />
        <Route path='/order/:id' element={<OrderScreen />} exact />
        <Route path='/paymentsuccess' element={<Success />} exact />
      </Routes>
      <Footer />
    </Roter>
  )
}

export default App