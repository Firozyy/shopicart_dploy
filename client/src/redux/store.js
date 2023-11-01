import { configureStore } from '@reduxjs/toolkit'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productSearchtReducer, topProductReducer } from './reducer/productReducer.js';
import { cartReducer } from './reducer/cartReducer.js';
import { userDetailsReducer, userListReducer, userLoginReducer, userRegisteReducer, userRemoveReducer, userUpdateReducer, userupdateProfileReducer } from './reducer/userReducer.js';
import { orderCreateReducer, orderDelivaryReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducer/orderReducer.js';


//cart from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },

  userLogin: {
    userInfo: userInfoFromStorage
  }
}
const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisteReducer,
    userDetails: userDetailsReducer,
    userupdate: userupdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userRemove: userRemoveReducer,
    usersUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDelivary: orderDelivaryReducer,
    productReviewCreate: productReviewCreateReducer,
    productSearcht: productSearchtReducer,
    topProduct: topProductReducer
  },
  preloadedState: initialState,
});


export default store;


export const server = 'https://shopicart-3v7e.onrender.com/api/v1'

// export const server = 'http://localhost:8080/api/v1'