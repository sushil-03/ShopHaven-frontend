import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import MetaData from "../layout/MetaData.js";
import { Button } from "@material-ui/core";
const Products = () => {
    const [price, setPrice] = useState([0, 100000]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100000);
    const [currentPage, setCurrentPage] = useState(1);
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();
    const categories = [
        "All Product",
        "Phones",
        "Ipad",
        "Laptop",
        "Watches",
        "Desktop",
        "Accessories",
    ];
    const [category, setCategory] = useState("All Product");
    const priceHandler = (e) => {
        setPrice([min, max]);
    };
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const { products, loading, productCount, error, resultPerPage } =
        useSelector((state) => state.products);
    // let count = filteredProductCount;
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getProduct(keyword, currentPage, price, category, rating));
    }, [dispatch, error, alert, keyword, currentPage, price, category, rating]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS SNAPHAVEN" />

                    <div className="mt-5 h-full border">
                        <h1 className="text-center font-oxygen font-bold text-3xl pb-2 border-b-2 max-w-xs mt-5 m-auto border-[c4c9d1]">
                            Products
                        </h1>
                        <div className="flex flex-col md:mt-20 products md:flex-row h-full">
                            <div className="filterBox md:w-[18rem]  w-full    pl-4 ">
                                {/* <div className="category  mt-2  md:h-[14rem] pl-5 "> */}
                                <div className="category  mt-2   pl-5 ">
                                    <h2 className="text-xl font-bold font-roboto md:text-2xl w-5/6">
                                        Price
                                    </h2>
                                    <div className="  w-full flex gap-2 items-center mb-2">
                                        <span className="relative">
                                            <input
                                                type="text"
                                                value={min}
                                                onChange={(e) =>
                                                    setMin(e.target.value)
                                                }
                                                placeholder="Min "
                                                className="w-20 pr-2 pl-4 py-1 border-2 border-purple-800 rounded-md text-sm"
                                            />
                                            <span className="absolute left-2 top-1">
                                                ₹
                                            </span>
                                        </span>
                                        <span className="relative">
                                            <input
                                                type="text"
                                                placeholder="Max"
                                                value={max}
                                                onChange={(e) =>
                                                    setMax(e.target.value)
                                                }
                                                className="w-20 pr-2 pl-4 py-1 border-2 border-purple-800 rounded-md text-sm"
                                            />
                                            <span className="absolute left-2 top-1">
                                                ₹
                                            </span>
                                        </span>
                                        <Button
                                            className="bg-purple-600"
                                            color="secondary"
                                            size="small"
                                            variant="contained"
                                            onClick={priceHandler}
                                        >
                                            Go
                                        </Button>
                                    </div>
                                    <h2 className="text-xl font-bold font-roboto md:text-2xl mt-2">
                                        Categories
                                    </h2>

                                    {/* If more categories are included replace it with  
                                    <ul className="flex flex-row flex-wrap no-underline ">
                  */}
                                    <ul className="no-underline">
                                        {categories.map((cate, key) => (
                                            <li
                                                key={cate}
                                                onClick={() => {
                                                    setCategory(cate);
                                                    setCurrentPage(0);
                                                }}
                                                className={`  ${
                                                    cate !== category
                                                        ? `hover:text-purple-500 hover:text-bold hover:text-xl`
                                                        : `text-purple-500  text-bold text-xl`
                                                }   pl-3 font-oxygen cursor-pointer transition-all duration-200 ease-in-out   h-[2rem]`}
                                            >
                                                {cate}
                                            </li>
                                        ))}
                                    </ul>
                                    <h2 className="text-xl font-bold font-roboto tmd:text-2xl mt-2">
                                        Rating
                                    </h2>
                                    <div className="w-5/6  rating ">
                                        <Slider
                                            color="secondary"
                                            value={rating}
                                            onChange={(e, newRating) => {
                                                setRating(newRating);
                                            }}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            min={0}
                                            max={5}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center flex-1 gap-10 mt-5 h-full ">
                                <div className="flex flex-wrap justify-center w-full gap-14 products md:mt-0 h-full ml-5">
                                    {products &&
                                        products.map((prod) => (
                                            <ProductCard
                                                product={prod}
                                                key={prod._id}
                                            />
                                        ))}
                                    {products && products.length === 0 && (
                                        <div className="grid place-items-center">
                                            <h1 className="text-4xl">
                                                Product not found! Search for
                                                another products.
                                            </h1>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="large"
                                                onClick={() => {
                                                    setCategory("All Product");
                                                    setCurrentPage(0);
                                                }}
                                            >
                                                Explore More Product
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="">
                                    {products && products.length !== 0 && (
                                        <div className="flex justify-center gap-2 text-lg text-blue-800 paginatio font-roboto ">
                                            <Pagination
                                                activePage={currentPage}
                                                itemsCountPerPage={
                                                    resultPerPage
                                                }
                                                totalItemsCount={productCount}
                                                onChange={setCurrentPageNo}
                                                nextPageText="Next"
                                                prevPageText="Prev"
                                                itemClass="page-item  border-gray-300 p-2  hover:text-white hover:bg-blue-500  transition-all duration-200 hover:text-bold"
                                                linkClass="page-link p-4 "
                                                activeClass="pageItemActive "
                                                activeLinkClass="pageLinkActive text-red-600 "
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
