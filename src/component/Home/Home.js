import React, { Fragment, useEffect, Suspense, lazy } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData.js";
import { clearError, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";
import { Image, Shimmer } from "react-shimmer";

import { useAlert } from "react-alert";
import { loadUser } from "../../actions/userAction.js";
import Footer from "../layout/Footer/Footer.js";
const ProductCard = lazy(() => import("../Product/ProductCard.js"));

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getProduct());
        // dispatch(loadUser());
    }, [dispatch, error, alert]);

    return (
        <div className="relative w-screen h-screen">
            <MetaData title="ShopHaven" />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="relative w-full overflow-hidden sm:h-2/6 md:h-3/5 lg:h-5/6 h-1/4 ">
                        {/* <div className="absolute w-full h-full overflow-hidden -z-10 md:top-0 top-3 bg-gradient-to-r from-cyan-500 to-blue-500"> */}
                        <div className="absolute w-full h-full overflow-hidden -z-10 md:top-0 top-3 ">
                            <Image
                                src="/home.jpg"
                                alt=""
                                className="w-full h-full bg-contain "
                                fallback={<Shimmer width={800} height={600} />}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full ">
                            <p className="mb-2 text-4xl font-bold text-center shadow-xl select-none md:mb-5 sm:text-6xl drop-shadow-2xl md:text-8xl font-rancho bg-clip-text">
                                Welcome to ShopHaven
                            </p>
                            <h1 className="text-xl font-semibold uppercase sm:text-3xl font-oxygen">
                                Find it, love it, buy it.
                            </h1>
                            <a href="#container">
                                <button className="flex items-center justify-between p-1 mx-2 mt-2 text-xl font-semibold transition-all duration-700 border-2 rounded-lg sm:p-3 md:mt-4 font-oxygen hover:bg-black/75 hover:text-white ">
                                    Scroll&nbsp;&nbsp; <CgMouse />
                                </button>
                            </a>
                        </div>
                    </div>

                    <h1
                        id="container"
                        className="text-center font-oxygen font-bold text-3xl pb-2 border-b-2 max-w-xs mt-10 m-auto border-[#c4c9d1] "
                    >
                        Featured Products
                    </h1>
                    <Suspense fallback={<>Loading</>}>
                        <div
                            // id="container "
                            className="container flex flex-wrap items-center justify-center w-full h-full mx-auto mt-10 gap-14"
                        >
                            {products &&
                                products.map((product, i) => (
                                    <ProductCard product={product} key={i} />
                                ))}
                            <Footer />
                        </div>
                    </Suspense>
                    {/* <Footer /> */}
                </Fragment>
            )}
        </div>
    );
};

export default Home;
