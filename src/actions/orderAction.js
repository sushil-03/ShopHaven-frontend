import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  UPDATE_ORDERS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
} from "../constants/orderConstant";
import Cookies from "universal-cookie";
import axios from "axios";
import { BASE_URL } from "../constants/userConstant";
axios.defaults.baseURL = BASE_URL;
//Create Order
const cookies = new Cookies();
export const createOrder = (order) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `/api/v1/order/new?token=${token}`,
      order,
      config
    );
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Own Orders
export const myOrders = () => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `/api/v1/orders/me?token=${token}`,
      config
    );
    console.log("ddddddddd", data);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Order Details
export const orderDetail = (id) => async (dispatch) => {
  const token = cookies.get("shophaventoken");

  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `/api/v1/order/${id}?token=${token}`,
      config
    );
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get All Orders -- ADMIN
export const getAllOrders = () => async (dispatch) => {
  const token = cookies.get("shophaventoken");

  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `/api/v1/admin/orders?token=${token}`,
      config
    );
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  const token = cookies.get("shophaventoken");

  try {
    dispatch({ type: UPDATE_ORDERS_REQUEST });

    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}?token=${token}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  const token = cookies.get("shophaventoken");

  try {
    dispatch({ type: DELETE_ORDERS_REQUEST });
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `/api/v1/admin/order/${id}?token=${token}`,
      config
    );
    dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
