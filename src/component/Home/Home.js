import React, { Fragment, useEffect, Suspense, lazy } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData.js";
import { clearError, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";

import Carousel from "react-material-ui-carousel";

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
        dispatch(loadUser());
    }, [dispatch, error, alert]);

    const items = [
        {
            url: "/home.jpg",
        },
        {
            url: "https://res.cloudinary.com/dlv5hu0eq/image/upload/v1661674439/carousel/daniel-romero-uLgSAoYcfHQ-unsplash_k5umuu.jpg",
        },
        {
            url: " https://res.cloudinary.com/dlv5hu0eq/image/upload/v1661674439/carousel/daniel-romero-Zq07dSZBTqg-unsplash_gxcnho.jpg",
        },
        {
            url: "https://res.cloudinary.com/dlv5hu0eq/image/upload/v1661674438/carousel/salman-hossain-saif-t2Q90MBUP78-unsplash_o9blcf.jpg",
        },

        {
            url: "https://res.cloudinary.com/dlv5hu0eq/image/upload/v1661612663/c-d-x-PDX_a_82obo-unsplash_qjrfli.jpg",
        },
    ];

    function Item({ item }) {
        return (
            <img
                src={item.url}
                alt=""
                className=" bg-contain w-full h-full    overflow-hidden"
            />
        );
    }
    return (
        <div className="relative h-screen w-screen">
            <MetaData title="ShopHaven" />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="relative  w-full sm:h-2/6  md:h-3/5 lg:h-5/6  h-1/4  overflow-hidden  ">
                        <div className="absolute w-full h-full   -z-10 overflow-hidden md:top-0 top-3">
                            <Carousel
                                interval={4000}
                                swipe={true}
                                indicators={false}
                                className="overflow-hidden"
                            >
                                {items.map((item, i) => (
                                    <Item key={i} item={item} />
                                ))}
                            </Carousel>
                        </div>
                        <div className=" h-full   flex flex-col items-center justify-center ">
                            <p className="md:mb-5 mb-2 text-4xl sm:text-6xl text-center drop-shadow-2xl	 shadow-xl select-none md:text-8xl  font-rancho font-bold bg-clip-text">
                                Welcome to ShopHaven
                            </p>
                            <h1 className="sm:text-3xl text-xl font-semibold uppercase font-oxygen">
                                Find it, love it, buy it.
                            </h1>
                            <a href="#container">
                                <button className="border-2 flex items-center justify-between sm:p-3 p-1 md:mt-4 mt-2 rounded-lg font-semibold font-oxygen text-xl mx-2 hover:bg-black/75 hover:text-white transition-all duration-700 ">
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
                            className="container flex flex-wrap gap-14 mt-10   justify-center h-full items-center mx-auto w-full"
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
