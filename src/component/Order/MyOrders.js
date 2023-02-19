import React, { useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import LaunchIcon from "@mui/icons-material/Launch";
import { DataGrid } from "@mui/x-data-grid";
import { clearError } from "../../actions/orderAction";
import { myOrders } from "../../actions/orderAction.js";
const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.user);
  const column = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "text-green-500"
          : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount ",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const row = [];
  orders &&
    orders.forEach((item, index) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);
  return (
    <div>
      <MetaData title={`${user.name} - Orders`}></MetaData>
      {loading ? (
        <Loader />
      ) : (
        <div className="container  w-full  h-screen rounded-lg border-2  m-auto shadow-2xl overflow-scroll ">
          <h1 className="p-4 mb-4 font-bold text-3xl font-roboto">Cart Info</h1>
          <DataGrid
            rows={row}
            columns={column}
            disableSelectionOnClick
            autoHeight
            className="font-roboto"
          />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
