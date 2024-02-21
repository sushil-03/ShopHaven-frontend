import React, { useRef, useEffect } from "react";
import CheckoutStep from "../cart/CheckoutStep.js";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { clearError, createOrder } from "../../actions/orderAction.js";

const Payment = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const token = cookies.get("shophaventoken");
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.totalPrice,
  };
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // dispatch(createOrder(order));

    payBtn.current.disable = true;
    try {
      let config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        `/api/v1/payment/process?token=${token}`,
        paymentData,
        config
      );
      console.log(
        "response from payment bac",
        response,
        response.data.client_secret
      );
      const data = response.data;
      const client_secret = data.client_secret;
      if (!stripe || !element) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: element.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: "IN",
            },
          },
        },
      });
      console.log("resultttttttt from payment bac", result);
      if (result.error) {
        payBtn.current.disable = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: "PAID",
          };
          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      console.log("errror", error);
      payBtn.current.disable = false;
      alert.error(error.response);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);

  return (
    <div className="grid w-full h-full m-auto my-10 place-items-center">
      <MetaData title="Shipping" />
      <div className="container w-full h-screen m-auto overflow-scroll border-2 rounded-lg shadow-2xl ">
        <h1 className="p-4 mb-4 text-3xl font-bold font-roboto">Card Info</h1>
        <CheckoutStep activeStep={2} />
        <div className="pt-20">
          <form
            className="grid gap-5 mx-2 place-items-center"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="flex items-center gap-5">
              <CreditCardIcon />
              <CardNumberElement className="p-3 border w-52" />
            </div>

            <div className="flex items-center gap-5">
              <EventIcon />
              <CardExpiryElement className="p-3 border w-52" />
            </div>
            <div className="flex items-center gap-5">
              <VpnKeyIcon />
              <CardCvcElement className="p-3 border w-52" />
            </div>
            <input
              type="submit"
              value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="p-4 text-lg font-bold text-white bg-red-600 rounded-lg font-roboto hover:bg-red-400"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Payment;
