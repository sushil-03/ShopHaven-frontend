import axios from "axios";
import Cookies from "universal-cookie";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  CLEAR_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  // RESET_PASSWORD_REQUEST,
  // RESET_PASSWORD_SUCCESS,
  // RESET_PASSWORD_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
  BASE_URL,
} from "../constants/userConstant";
// axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.baseURL = BASE_URL;
const cookies = new Cookies();

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    console.log("login response", response);
    // localStorage.setItem();
    const token = response.data.token;
    if (token) {
      cookies.set("shophaventoken", token);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (UserData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const response = await axios.post(`/api/v1/register`, UserData, config);
    const token = response.data.token;
    if (token) {
      cookies.set("shophaventoken", token);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const token = cookies.get("shophaventoken");
    if (!token) {
      throw new Error("not available");
    }
    dispatch({ type: LOAD_USER_REQUEST });
    const response = await axios.get(`/api/v1/me?token=${token}`, config);
    dispatch({ type: LOAD_USER_SUCCESS, payload: response?.data?.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    cookies.remove("shophaventoken");
    await axios.get(`/api/v1/logout`, config);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

//
export const updateRole = (id, UpdatedRole) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: UPDATE_USER_ROLE_REQUEST });
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = await axios.put(
      `/api/v1/admin/user/${id}?token=${token}`,
      UpdatedRole,
      config
    );
    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_ROLE_FAIL, payload: error.response.data });
  }
};

//Update Profile
export const updateProfile = (UserData) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    let config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `/api/v1/me/update?token=${token}`,
      UserData,
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.success,
    });
  }
};

export const changePassword = (UpdatedPassword) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    let config = {
      header: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = await axios.put(
      `/api/v1/password/update?token=${token}`,
      UpdatedPassword,
      config
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data });
  }
};

//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = await axios.post(
      `/api/v1/password/forgot?token=${token}`,
      { email },
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Get all userss
export const getallUser = () => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  let config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  try {
    dispatch({ type: ALL_USER_REQUEST });
    const response = await axios.get(
      `/api/v1/admin/users?token=${token}`,
      config
    );
    dispatch({ type: ALL_USER_SUCCESS, payload: response.data.users });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message });
  }
};
//Get user detail
export const getUserDetail = (id) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    dispatch({ type: USER_DETAIL_REQUEST });
    const response = await axios.get(
      `/api/v1/admin/user/${id}?token=${token}`,
      config
    );
    dispatch({ type: USER_DETAIL_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update User
export const updateUser = (id, UserData) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    let config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}?token=${token}`,
      UserData,
      config
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.success,
    });
  }
};

//Delete User
export const deleteUser = (id) => async (dispatch) => {
  const token = cookies.get("shophaventoken");
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    let config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `/api/v1/admin/user/${id}?token=${token}`,
      config
    );
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.success,
    });
  }
};
