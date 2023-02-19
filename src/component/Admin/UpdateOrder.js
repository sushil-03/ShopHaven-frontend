import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import Loader from "../layout/Loader/loader";
import {
  clearError,
  orderDetail,
  updateOrder,
} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstant";

const UpdateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDERS_RESET });
      navigate("/admin/orders");
    }
    dispatch(orderDetail(id));
  }, [dispatch, alert, navigate, id, error, updateError, isUpdated]);

  const updateProcessHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };
  console.log(status);
  return (
    <div>
      <div className="w-screen h-screen m-auto grid place-items-center mt-10 border-t-2 overflow-scroll">
        <MetaData title="UPDATE PRODUCT"></MetaData>
        <div className="border w-full h-full flex ">
          <div className="md:w-1/6 w-1/4">
            <SideBar />
          </div>
          <div className="md:w-5/6 w-3/4  px-4 md:border-l-2 h-full">
            <div className="header  font-roboto font-semibold ">
              {loading ? (
                <Loader />
              ) : (
                <div>
                  <div className={` flex  flex-row  flex-wrap gap-5 mt-5 `}>
                    <div
                      className={` md:border-r-2    ${
                        order && order.orderStatus === "Delivered"
                          ? "w-full"
                          : "w-8/12"
                      }   `}
                    >
                      <div className=" mt-4 px-4">
                        <h1 className="p-4  font-bold text-3xl font-roboto">
                          Shipping Info
                        </h1>
                        <div className="px-8 font-roboto">
                          <div className="flex items-center gap-5 mb-2 ">
                            <p className=" text-lg  ">Name: </p>
                            <span className="text-base text-gray-500">
                              {order && order.user && order.user.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-5 mb-2">
                            <p className=" text-lg  ">Phone: </p>
                            <span className="text-base text-gray-500">
                              {order &&
                                order.shippingInfo &&
                                order.shippingInfo.phoneNo}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-5 mb-2">
                            <p className=" text-lg  ">Address: </p>
                            <span className="text-sm md:text-base text-gray-500">
                              {order &&
                                order.shippingInfo &&
                                `${order.shippingInfo.address} ,${order.shippingInfo.city} ,${order.shippingInfo.state} ,${order.shippingInfo.pinCode} ,${order.shippingInfo.country}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className=" mt-4 px-4 ">
                        <h1 className="p-4  font-bold text-3xl font-roboto">
                          Payment
                        </h1>
                        <div className="flex items-center gap-5 mb-2 px-8">
                          <p className="text-green-500 text-lg">PAID</p>
                        </div>

                        <div className="flex items-center gap-5 mb-2 px-8">
                          <p className=" text-lg  ">Amount: </p>
                          <span className="text-base text-gray-500">
                            {order.totalPrice && order.totalPrice}
                          </span>
                        </div>

                        {/* <div className=" mt-4 px-4 "> */}
                        <h1 className="p-4  font-bold text-3xl font-roboto">
                          Order Status
                        </h1>
                        {/* </div> */}
                        <div className="flex items-center gap-5 mb-2 px-4">
                          <p
                            className={`${
                              order.orderStatus &&
                              order.orderStatus === "Delivered"
                                ? "text-green-500"
                                : "text-red-600"
                            } px-4 text-lg uppercase`}
                          >
                            {order && order.orderStatus}
                          </p>
                        </div>
                      </div>

                      <div className=" mt-4 p-4 ">
                        <h1 className="p-4 mb-4 font-semibold text-2xl font-roboto">
                          Your Order Item
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
                              <Link to={`/product/${item.product_id}`}>
                                {item.name}
                              </Link>
                              <span>
                                {item.quantity} X ₹{item.price} ={" "}
                                <b>₹{item.quantity * item.price}</b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    {order && order.orderStatus !== "Delivered" ? (
                      <div className="my-4  font-roboto  md:w-3/12 w-full   relative ">
                        <h2 className="text-3xl my-3 font-roboto">
                          PROCESS ORDER
                        </h2>
                        <form action="">
                          <div className=" flex flex-row gap-5 border items-center">
                            <AccountTreeIcon />
                            <select
                              onChange={(e) => setStatus(e.target.value)}
                              className="p-2 w-full border flex-1"
                            >
                              <option value=""> Choose Category</option>
                              {order && order.orderStatus === "Processing" && (
                                <option value="Shipped">Shipped</option>
                              )}
                              {order && order.orderStatus === "Shipped" && (
                                <option value="Delivered"> Delivered</option>
                              )}
                            </select>
                          </div>

                          <button
                            onClick={updateProcessHandler}
                            type="submit "
                            disabled={
                              (loading ? true : false) ||
                              (status === "" ? true : false)
                            }
                            className="border m-4 p-3 bg-red-500 hover:bg-red-700 text-white font-roboto text-xl rounded-lg"
                          >
                            Update
                          </button>
                        </form>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
