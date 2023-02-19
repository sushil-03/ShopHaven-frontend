import React from "react";
import MetaData from "../layout/MetaData";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <div className="w-full h-full m-auto grid place-items-center my-10">
        <MetaData title="Order Success" />
        <div className="container  w-full  h-screen rounded-lg border-2  m-auto  shadow-2xl ">
          <div className=" w-max m-auto md:mt-52 mt-28 px-2 items-center flex flex-col">
            <BsCheckCircleFill className="" size="6rem" color="red" />
            <h1 className="md:text-3xl text-xl pt-5">
              Your Order has been placed successfully
            </h1>
            <Link
              to="/orders"
              className="bg-black text-white md:p-4 p-2 mt-5 rounded-lg "
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
