import React, { useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar.js";
import {
  clearError,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstant.js";

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  useEffect(() => {
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDERS_RESET });
      navigate("/admin/orders");
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearError());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

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
          ? "text-green-500 text-xl"
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
          <div>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon className="text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div>
      <MetaData title="All Products" />
      <div className="w-screen h-screen m-auto grid place-items-center mt-10 border-t-2 overflow-scroll">
        <div className="border w-full h-full flex ">
          <div className="md:w-1/6 w-1/4">
            <SideBar />
          </div>
          <div className="md:w-5/6 w-3/4  px-4 ">
            <div className="header text-center font-roboto font-semibold ">
              <h2 className="text-3xl my-3">ALL PRODUCTS</h2>
              <DataGrid
                rows={rows}
                columns={column}
                disableSelectionOnClick
                autoHeight
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "gray",
                    color: "white",
                    font: "bold",
                    fontSize: "1.3rem",
                    fontWeight: "600",
                  },
                }}
                className="font-roboto "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
