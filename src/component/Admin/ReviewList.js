import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar.js";
import { clearError } from "../../actions/orderAction";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getAllReview, deleteReviews } from "../../actions/productAction.js";
import { DELETEL_REVIEW_RESET } from "../../constants/productConstant.js";
import StarIcon from "@mui/icons-material/Star";
const ReviewList = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  useEffect(() => {
    if (productId && productId.length === 24) {
      dispatch(getAllReview(productId));
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: DELETEL_REVIEW_RESET });
      navigate("/admin/review");
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearError());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [productId, dispatch, alert, error, deleteError, isDeleted, navigate]);
  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    console.log(productId);
    dispatch(getAllReview(productId));
  };
  const deleteReviewHandler = (id) => {
    dispatch(deleteReviews(id, productId));
  };
  const column = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 150,
      flex: 0.5,
      type: "number",
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "text-green-500"
          : "text-red-500 ";
      },
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
          <Button
            onClick={() =>
              deleteReviewHandler(params.getValue(params.id, "id"))
            }
          >
            <DeleteIcon className="text-red-600" />
          </Button>
        );
      },
    },
  ];
  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
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
          <div className="md:w-5/6 w-3/4  px-4  border-l-2">
            <h2 className="text-3xl my-3">ALL REVIEWS</h2>
            <div className="flex flex-col justify-center items-center gap-8 border w-min m-auto px-5 py-10 rounded-lg shadow-xl">
              <div className="flex justify-center items-center gap-5">
                <StarIcon className="" />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  className=" border p-4"
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
              <button
                onClick={productReviewSubmitHandler}
                type="submit "
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }
                className="border w-56  p-3 bg-red-500 hover:bg-red-700 text-white font-roboto text-xl rounded-lg"
              >
                Update
              </button>
            </div>
            {reviews && reviews.length > 0 ? (
              <div className="header text-center font-roboto font-semibold mt-10">
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
            ) : (
              <div className="text-3xl font-roboto font-bold text-center mt-10 text-gray-500">
                No Review
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
