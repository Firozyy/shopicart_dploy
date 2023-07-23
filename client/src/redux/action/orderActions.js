import { server } from "../store.js";
import axios from "axios"
export const createOrder = (order) => async (dispatch, getState) => {


  try {
    dispatch({ type: "ORDER_CREATE_REQUEST" });

    const { userLogin: { userInfo } } = getState()
    const { data } = await axios.post(`${server}/orders`, order, {
      headers: {
        "Content-Type": 'application/json',
        authrization: `Bearer ${userInfo.token}  `
      },
      withCredentials: true,

    });

    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data })

  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL", payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
};

export const getorderDetails = (id) => async (dispatch, getState) => {


  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });

    const { userLogin: { userInfo } } = getState()
    const { data } = await axios.get(`${server}/order/${id}`, {
      headers: {

        authrization: `Bearer ${userInfo.token}  `
      },
      withCredentials: true,

    });

    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data })

  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL", payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
};


export const payOrder = (orderId) => async (dispatch, getState) => {



  try {
    dispatch({
      type: "ORDER_PAY_REQUEST",
    })

    const order = {
      orderId
    }
    console.log(order);
    const { userLogin: { userInfo } } = getState()
    const { data } = await axios.put(`${server}/order/updateorder`, order, {
      headers: {
        "Content-Type": 'application/json',
        authrization: `Bearer ${userInfo.token}  `
      },
      withCredentials: true,

    });

    dispatch({
      type: "ORDER_PAY_SUCCESS",
      payload: data,
    })
  } catch (error) {

    dispatch({
      type: "ORDER_PAY_FAIL",
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}



export const listMyOrders = () => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: "MY_ORDERS_REQUEST",
    })

    const { userLogin: { userInfo } } = getState()
    const { data } = await axios.get(`${server}/orders/allOrders`, {
      headers: {
        "Content-Type": 'application/json',
        authrization: `Bearer ${userInfo.token}  `
      },
      withCredentials: true,

    });

    dispatch({
      type: "MY_ORDERS_SUCCESS",
      payload: data,
    })
  } catch (error) {

    dispatch({
      type: "MY_ORDERS_FAIL",
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const listAllOrders = () => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: "ALL_ORDERS_REQUEST",
    })

    const { userLogin: { userInfo } } = getState()
    const { data } = await axios.get(`${server}/orders/getallOrders`, {
      headers: {
        "Content-Type": 'application/json',
        authrization: `Bearer ${userInfo.token}  `
      },
      withCredentials: true,

    });

    dispatch({
      type: "ALL_ORDERS_SUCCESS",
      payload: data,
    })
  } catch (error) {

    dispatch({
      type: "ALL_ORDERS_FAIL",
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {



  try {
    dispatch({
      type: "ORDER_DELIVERY_REQUEST",
    })



    const { userLogin: { userInfo } } = getState()
     await axios.put(`${server}/order/delivered/${orderId}`, {}, {
      headers: {
        "Content-Type": 'application/json',
        authrization: `Bearer ${userInfo.token}  `
      },
      withCredentials: true,

    });

    dispatch({
      type: "ORDER_DELIVERY_SUCCESS",

    })
  } catch (error) {

    dispatch({
      type: "ORDER_DELIVERY_FAIL",
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}
