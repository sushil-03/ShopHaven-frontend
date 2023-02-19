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
        <div className="container  w-full rounded-lg border-2  m-auto shadow-2xl overflow-scroll ">
          <div className="header flex w-full  border-b justify-between ">
            <h1 className="p-4 font-bold text-2xl font-roboto">
              Shopping Cart
            </h1>
            <h2 className="p-4 text-xl font-roboto">
              {cartItems ? cartItems.length : 0} Item
            </h2>
          </div>
          <div className="headerProduct flex mt-2 p-3 gap-2">
            <h1 className="w-2/4 text-gray-500 md:text-lg uppercase">
              Product Detail
            </h1>
            <h1 className="w-1/4 text-gray-500 md:text-lg uppercase">
              Quantity
            </h1>
            <h1 className="w-1/4 text-gray-500 md:text-lg uppercase sm:block hidden">
              Price
            </h1>
            <h1 className="w-1/4 text-gray-500 md:text-lg uppercase">
              Subtotal
            </h1>
          </div>
          {cartItems.length === 0 ? (
            <div className="grid place-items-center mt-10">
              <MdRemoveShoppingCart size="4rem" color="red" />
              <h2 className="md:text-4xl  text-2xl font-roboto my-4">
                No Product in Your Cart
              </h2>
              <Link
                to="/products"
                className="my-4 border p-4 font-bold font-roboto md:text-xl text-lg bg-black text-white"
              >
                View Products
              </Link>
            </div>
          ) : (
            <div className="">
              <div className="cartProduct flex flex-col ">
                {cartItems &&
                  cartItems.map((item) => (
                    <CartCard item={item} key={item.product_id} />
                  ))}
              </div>
              <div className="py-6 border-t-2 text-center">
                <span className="md:text-4xl text-3xl font-roboto font-semibold">
                  Sub-Total:
                </span>
                <span className=" pl-5 md:text-3xl text-2xl font-roboto">
                  ₹
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
                <button
                  className=" ml-10 font-roboto text-xl rounded-lg bg-red-600 text-white font-bold p-2 hover:bg-red-400 hover:scale-75 transition-all duration-500  "
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
