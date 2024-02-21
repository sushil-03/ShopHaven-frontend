import React from "react";
import CartCard from "./CartCard.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData.js";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <MetaData title="Cart" />
      <div className="w-full h-screen m-auto my-10 overflow-scroll">
        <div className="container w-full m-auto overflow-scroll border-2 rounded-lg shadow-2xl ">
          <div className="flex justify-between w-full border-b header ">
            <h1 className="p-4 text-2xl font-bold font-roboto">
              Shopping Cart
            </h1>
            <h2 className="p-4 text-xl font-roboto">
              {cartItems ? cartItems.length : 0} Item
            </h2>
          </div>
          <div className="flex gap-2 p-3 mt-2 headerProduct">
            <h1 className="w-2/4 text-gray-500 uppercase md:text-lg">
              Product Detail
            </h1>
            <h1 className="w-1/4 text-gray-500 uppercase md:text-lg">
              Quantity
            </h1>
            <h1 className="hidden w-1/4 text-gray-500 uppercase md:text-lg sm:block">
              Price
            </h1>
            <h1 className="w-1/4 text-gray-500 uppercase md:text-lg">
              Subtotal
            </h1>
          </div>
          {cartItems.length === 0 ? (
            <div className="grid mt-10 place-items-center">
              <MdRemoveShoppingCart size="4rem" color="red" />
              <h2 className="my-4 text-2xl md:text-4xl font-roboto">
                No Product in Your Cart
              </h2>
              <Link
                to="/products"
                className="p-4 my-4 text-lg font-bold text-white bg-black border font-roboto md:text-xl"
              >
                View Products
              </Link>
            </div>
          ) : (
            <div className="">
              <div className="flex flex-col cartProduct ">
                {cartItems &&
                  cartItems.map((item) => (
                    <CartCard item={item} key={item.product_id} />
                  ))}
              </div>
              <div className="py-6 text-center border-t-2">
                <span className="text-3xl font-semibold md:text-4xl font-roboto">
                  Sub-Total:
                </span>
                <span className="pl-5 text-2xl md:text-3xl font-roboto">
                  ₹
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
                <button
                  className="p-2 ml-10 text-xl font-bold text-white transition-all duration-500 bg-red-600 rounded-lg font-roboto hover:bg-red-800 "
                  onClick={checkoutHandler}
                >
                  CheckOut
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
