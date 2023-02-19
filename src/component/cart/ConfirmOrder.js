import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutStep from "../cart/CheckoutStep.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log("confirm order", subtotal);
  const shippingCharge = subtotal > 1000 ? 200 : 0;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharge + tax;
  const address = `${shippingInfo.address} ,${shippingInfo.city} ,${shippingInfo.state} ,${shippingInfo.pinCode} ,${shippingInfo.country}`;
  const proceedToPayement = () => {
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <div>
      <div className="w-full h-full m-auto grid place-items-center my-10">
        <MetaData title="Confirm Order" />
        <div className="container  w-full  h-screen rounded-lg border-2  m-auto shadow-2xl overflow-scroll pb-4">
          <div className="mt-5">
            <CheckoutStep activeStep={1} />
          </div>
          <div className=" flex justify-center md:flex-row items-center flex-col gap-5 mt-5">
            <div className="md:w-1/2 md:border-r-2">
              <div className=" mt-4 p-4 ">
                <h1 className="p-4  font-bold text-2xl font-roboto">
                  Shipping Info
                </h1>
                <div className="px-4 font-roboto">
                  <div className="flex items-center gap-5 mb-2">
                    <p className=" text-lg  ">Name: </p>
                    <span className="text-base text-gray-500">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-5 mb-2">
                    <p className=" text-lg  ">Phone: </p>
                    <span className="text-base text-gray-500">
                      {shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div className="flex items-center gap-5 mb-2">
                    <p className=" text-lg  ">Address: </p>
                    <span className="text-base text-gray-500">{address}</span>
                  </div>
                </div>
              </div>

              <div className=" mt-4 p-4 ">
                <h1 className="p-4 mb-4 font-semibold text-2xl font-roboto">
                  Your Cart Item
                </h1>
                {cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex items-center justify-between mb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-fit"
                    />
                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.quantity * item.price}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-4 p-4 font-roboto md:w-1/2 w-3/4 h-[20rem]  relative ">
              <h1 className="p-4 mb-4 font-semibold text-2xl font-roboto ">
                Order Summary
              </h1>

              <div className="flex  md:w-3/4 md:justify-around justify-between items-center font-roboto">
                <div className="flex flex-col gap-3 ">
                  <p className=" text-lg">Subtotal:</p>
                  <p className=" text-lg ">Shipping Charge:</p>
                  <p className=" text-lg">GST:</p>
                  <p className=" text-xl mt-4">Total:</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-lg text-gray-500">₹{subtotal}</p>
                  <p className="text-lg text-gray-500">₹{shippingCharge}</p>
                  <p className="text-lg text-gray-500">₹{tax}</p>
                  <p className="text-xl text-gray-500 mt-4 ">₹{totalPrice}</p>
                </div>
                <span className="w-[24rem]  border absolute border-gray-400 bottom-24 md:left-10 left-0"></span>
              </div>
              <div className="  mt-4  " onClick={proceedToPayement}>
                <button className=" md:p-4 md:w-full p-2 bg-red-600 font-roboto font-bold text-white hover:bg-red-400 ">
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
