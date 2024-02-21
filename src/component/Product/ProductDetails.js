import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import Rating from "@mui/material/Rating";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const [imageUrl, getUrl] = useState("");

  const options = {
    size: "large",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  const increaseQuantity = () => {
    if (product.Stock > quantity) setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  //Review
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };
  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  let descriptionItem = [];
  if (product && product.description) {
    descriptionItem = product.description.split("$");
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} ---  SNAPSHARE`} />
          <div className="flex flex-col w-screen mt-10 productInfo md:flex-row ">
            <div className="flex flex-col img md:w-1/2 md:flex-row">
              <div className="images md:w-1/5 ">
                {product.images ? (
                  <div className="flex flex-row items-center justify-center w-full mt-5 md:flex-col ">
                    {product.images.map((image, i) => (
                      <img
                        src={image.url}
                        alt={`Slide ${i}`}
                        key={image.url}
                        className="w-1/5 mb-4 ml-2 border-2 md:w-3/5 hover:border-red-600"
                        onClick={() => getUrl(image.url)}
                        onMouseEnter={() => getUrl(image.url)}
                      />
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="grid w-full mainImage place-items-center ">
                {product.images ? (
                  <img
                    src={imageUrl === "" ? product.images[0].url : imageUrl}
                    alt="mainImage"
                    className="md:w-4/5 "
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center pl-4 ml-10 details md:w-1/2">
              <div className="w-1/2 mb-4 border-b-2 block1">
                <h2 className="pt-4 text-4xl font-bold uppercase">
                  {product.name}
                </h2>
                <p className="font-semibold text-gray-500 font-oxygen">
                  {product.category}
                </p>
              </div>
              <div className="flex flex-wrap items-center mb-3 block2">
                <Rating {...options} />
                <span className="m-4 text-blue-800 font-oxygen">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="block3">
                <div className="flex items-center ">
                  <span className="text-xl font-extrabold font-roboto">
                    Price : &nbsp;&nbsp;₹
                  </span>
                  <span className="text-3xl">
                    {`${product.price}`} &nbsp;&nbsp;
                  </span>
                  <span className="text-xl line-through">
                    {" "}
                    {`₹${product.price + 1000}`}
                  </span>
                </div>
                <div className="flex flex-col flex-wrap items-start gap-4 block3 ">
                  <div className="flex justify-between my-2 border w-52">
                    <Button
                      variant="text"
                      color="primary"
                      className="font-semibold text-2xl   bg-black text-white hover:bg-[#777272] font-roboto"
                      onClick={decreaseQuantity}
                    >
                      <RemoveIcon />
                    </Button>
                    <input
                      type="text"
                      color="primary"
                      value={quantity}
                      className="w-1/2 text-xl font-semibold text-center outline-none font-roboto"
                      onChange={(e) => setQuantity(e.target.value)}
                      readOnly={true}
                    />
                    <Button
                      variant="text"
                      className="font-bold text-2xl   h-full  bg-[#231e1e] text-white hover:bg-[#777272] "
                      onClick={increaseQuantity}
                    >
                      <AddIcon />
                    </Button>
                  </div>
                  <div className="">
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      className="w-full   py-3 px-5 font-semibold text-white bg-[#231e1e] font-oxygen text-xl rounded-lg hover:bg-[#777777] hover:scale-95 transition-all duration-700"
                      disabled={product.Stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>

              <div className="my-3 block4">
                <span className="text-xl font-bold font-roboto">Status : </span>
                <span
                  className={
                    product.Stock < 1
                      ? "text-red-500 font-semibold font-oxygen"
                      : "text-blue-700 font-semibold font-oxygen"
                  }
                >
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </span>
              </div>
              <div className="mb-3 block5">
                <span className="text-xl font-bold font-roboto">
                  About this item :
                </span>

                <p className="pr-2 font-semibold text-gray-500 font-oxygen md:pr-5">
                  <ul className="list-disc">
                    {product.description &&
                      descriptionItem.map((item, key) => (
                        <li key={key}>{item}</li>
                      ))}
                  </ul>
                </p>
              </div>
              <Button
                variant="contained"
                size="large"
                color="primary"
                // className="border w-max py-3 px-5 mt-4 font-semibold text-white bg-blue-500 font-oxygen text-xl rounded-lg hover:bg-[#777777] hover:scale-95 transition-all duration-700"
                className="w-max"
                onClick={submitReviewToggle}
              >
                Submit Review
              </Button>
            </div>
          </div>
          <div className="mt-10 Reviews">
            <h1 className="text-center font-oxygen font-bold text-3xl pb-2 border-b-2 max-w-xs mt-5 m-auto border-[c4c9d1] flex-wrap">
              REVIEWS
            </h1>
            <Dialog
              aria-label="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="flex flex-col items-center gap-4">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <textarea
                  value={comment}
                  cols="50"
                  rows="10"
                  className="border-2"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button color="primary" onClick={reviewSubmitHandler}>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="flex flex-wrap justify-around gap-2 my-10">
                {product.reviews.map((review, i) => (
                  <ReviewCard review={review} key={i} />
                ))}
              </div>
            ) : (
              <p className="m-6 text-xl font-semibold font-roboto">
                No Reviews Yet
              </p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
