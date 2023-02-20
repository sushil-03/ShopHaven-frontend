import axios from "axios";

import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    CLEAR_ERROR,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_FAIL,
} from "../constants/productConstant";
axios.defaults.baseURL = "https://shophaven-backend.vercel.app/";
// axios.defaults.baseURL = "http://localhost:3001";

export const getProduct =
    (
        keyword = "",
        currentPage = 1,
        price = [0, 50000],
        category = "",
        rating = 0
    ) =>
    async (dispatch) => {
        let config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
            // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&rating[gte]=${rating}`;
            if (category && category !== "All Product") {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
            }
            const { data } = await axios.get(link, config);
            dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

export const getProductDetails = (id) => async (dispatch) => {
    let config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(`/api/v1/product/${id}`, config);
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newReview = (review) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        let config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.put(`/api/v1/review`, review, config);
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Admin
//Get all review of a product
export const getAllReview = (id) => async (dispatch) => {
    let config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`, config);
        dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Delete review of a product
export const deleteReviews = (id, productId) => async (dispatch) => {
    try {
        let config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `/api/v1/reviews?id=${id}&productId=${productId}`,
            config
        );
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.reviews });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getAllProductAdmin = () => async (dispatch) => {
    let config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };

    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get("/api/v1/admin/products", config);
        dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        let config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };

        const { data } = await axios.post(
            `/api/v1/admin/product/new`,
            product,
            config
        );
        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        let config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.delete(
            `/api/v1/admin/product/${id}`,
            config
        );
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const updateProduct = (product, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        let config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.put(
            `/api/v1/admin/product/${id}`,
            product,
            config
        );
        console.log(data);
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
