import React, { useRef, useEffect } from "react";
import CheckoutStep from "../cart/CheckoutStep.js";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
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
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
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
    payBtn.current.disable = true;
    try {
      let config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
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
              country: shippingInfo.country,
            },
          },
        },
      });
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
    <div className="w-full h-full m-auto grid place-items-center my-10">
      <MetaData title="Shipping" />
      <div className="container  w-full  h-screen rounded-lg border-2  m-auto shadow-2xl overflow-scroll ">
        <h1 className="p-4 mb-4 font-bold text-3xl font-roboto">Card Info</h1>
        <CheckoutStep activeStep={2} />
        <div className="pt-20">
          <form
            className="grid place-items-center gap-5 mx-2"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="flex gap-5 items-center">
              <CreditCardIcon />
              <CardNumberElement className="border w-52 p-3" />
            </div>

            <div className="flex gap-5 items-center">
              <EventIcon />
              <CardExpiryElement className="border w-52 p-3" />
            </div>
            <div className="flex gap-5 items-center">
              <VpnKeyIcon />
              <CardCvcElement className="border w-52 p-3" />
            </div>
            <input
              type="submit"
              value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className=" text-lg rounded-lg p-4 bg-red-600 font-roboto font-bold text-white hover:bg-red-400"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Payment;
