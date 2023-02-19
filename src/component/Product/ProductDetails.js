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
                    <div className="productInfo w-screen  flex flex-col md:flex-row mt-10 ">
                        <div className="img md:w-1/2 flex md:flex-row flex-col">
                            <div className="images  md:w-1/5 ">
                                {product.images ? (
                                    <div className="flex flex-row md:flex-col  w-full  mt-5 items-center  justify-center ">
                                        {product.images.map((image, i) => (
                                            <img
                                                src={image.url}
                                                alt={`Slide ${i}`}
                                                key={image.url}
                                                className=" ml-2 mb-4 w-1/5  md:w-3/5  border-2 hover:border-red-600 "
                                                onClick={() =>
                                                    getUrl(image.url)
                                                }
                                                onMouseEnter={() =>
                                                    getUrl(image.url)
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="mainImage w-full grid place-items-center ">
                                {product.images ? (
                                    <img
                                        src={
                                            imageUrl === ""
                                                ? product.images[0].url
                                                : imageUrl
                                        }
                                        alt="mainImage"
                                        className="md:w-4/5 "
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="details md:w-1/2   flex flex-col pl-4 justify-center ml-10">
                            <div className="block1 mb-4 border-b-2 w-1/2">
                                <h2 className="uppercase font-bold text-4xl pt-4">
                                    {product.name}
                                </h2>
                                <p className="text-gray-500 font-semibold font-oxygen">
                                    {product.category}
                                </p>
                            </div>
                            <div className="block2 flex flex-wrap items-center mb-3">
                                <Rating {...options} />
                                <span className="m-4 font-oxygen text-blue-800">
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="block3">
                                <div className=" flex items-center">
                                    <span className="text-xl font-roboto font-extrabold">
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
                                <div className="block3  flex flex-wrap    gap-4  flex-col items-start	">
                                    <div className=" flex my-2 w-52 justify-between border">
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
                                            className="w-1/2 outline-none  text-center text-xl font-semibold font-roboto"
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
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
                                            disabled={
                                                product.Stock < 1 ? true : false
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="block4 my-3">
                                <span className="font-bold text-xl font-roboto">
                                    Status :{" "}
                                </span>
                                <span
                                    className={
                                        product.Stock < 1
                                            ? "text-red-500 font-semibold font-oxygen"
                                            : "text-blue-700 font-semibold font-oxygen"
                                    }
                                >
                                    {product.Stock < 1
                                        ? "OutOfStock"
                                        : "InStock"}
                                </span>
                            </div>
                            <div className="block5 mb-3">
                                <span className="font-bold text-xl font-roboto">
                                    About this item :
                                </span>

                                <span className="font-oxygen font-semibold text-gray-500">
                                    <ul className="list-disc">
                                        {product.description &&
                                            descriptionItem.map((item, key) => (
                                                <li key={key}>{item}</li>
                                            ))}
                                    </ul>
                                </span>
                            </div>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                className="border w-max py-3 px-5 mt-4 font-semibold text-white bg-[#231e1e] font-oxygen text-xl rounded-lg hover:bg-[#777777] hover:scale-95 transition-all duration-700"
                                onClick={submitReviewToggle}
                            >
                                Submit Review
                            </Button>
                        </div>
                    </div>
                    <div className="Reviews mt-10">
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
                                    cols="30"
                                    rows="5"
                                    className="border-2"
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={submitReviewToggle}
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={reviewSubmitHandler}
                                >
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {product.reviews && product.reviews[0] ? (
                            <div className="flex gap-2 my-10 justify-around flex-wrap">
                                {product.reviews.map((review, i) => (
                                    <ReviewCard review={review} key={i} />
                                ))}
                            </div>
                        ) : (
                            <p className="font-roboto font-semibold text-xl m-6">
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
