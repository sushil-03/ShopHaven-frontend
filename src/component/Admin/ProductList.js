import React, { useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  getAllProductAdmin,
  deleteProduct,
  clearError,
} from "../../actions/productAction.js";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant.js";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
      // navigate("/admin/dashboard");
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearError());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllProductAdmin());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);
  const deleteproductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const column = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      flex: 0.5,
      type: "number",
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteproductHandler(params.getValue(params.id, "id"))
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
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
                  "& .MuiDataGrid-cell:hover": {
                    color: "primary.main",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "red",
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

export default ProductList;
