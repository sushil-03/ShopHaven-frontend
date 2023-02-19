import React, { useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearError, orderDetail } from "../../actions/orderAction";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  let { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(orderDetail(id));
  }, [dispatch, error, alert, id]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container  w-full  h-screen rounded-lg border-2  m-auto shadow-2xl overflow-scroll ">
          <MetaData title="Order Details" />
          <div className="orderContainer mt-4">
            <h1 className="text-3xl text-red-500 pl-4">
              {" "}
              Order #{order && order._id}
            </h1>
            <div className=" mt-4 p-4 ">
              <h1 className="p-4  font-bold text-2xl font-roboto">
                Shipping Info
              </h1>
              <div className="px-4 font-roboto">
                <div className="flex items-center gap-5 mb-2">
                  <p className=" text-lg  ">Name: </p>
                  <span className="text-base text-gray-500">
                    {order.user && order.user.name}
                  </span>
                </div>
                <div className="flex items-center gap-5 mb-2">
                  <p className=" text-lg  ">Phone: </p>
                  <span className="text-base text-gray-500">
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex items-center gap-5 mb-2">
                  <p className=" text-lg  ">Address: </p>
                  <span className="text-base text-gray-500">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address} ,${order.shippingInfo.city} ,${order.shippingInfo.state} ,${order.shippingInfo.pinCode} ,${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
            </div>

            <div className=" mt-4 px-4 ">
              <h1 className="p-4  font-bold text-2xl font-roboto">Payment </h1>
              <div className="flex items-center gap-5 mb-2 px-4">
                <p className="text-lg text-green-500">PAID</p>
              </div>
              <div className="flex items-center gap-5 mb-2 px-4">
                <p className=" text-lg  ">Amount: </p>
                <span className="text-base text-gray-500">
                  {order.totalPrice && order.totalPrice}
                </span>
              </div>
              <div className=" items-center gap-5 mb-2">
                <h1 className="p-4  font-bold text-2xl font-roboto">
                  Order Status
                </h1>
                <p
                  className={`${
                    order.orderStatus && order.orderStatus === "Delivered "
                      ? "text-green-500"
                      : "text-red-600"
                  } px-4 text-lg`}
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>

            <div className=" mt-4 p-4 border-t-2">
              <h1 className="p-4 mb-4 font-semibold text-2xl font-roboto">
                Order Item
              </h1>
              {order.orderItems &&
                order.orderItems.map((item) => (
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
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
