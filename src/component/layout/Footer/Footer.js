import React from "react";
// import apple from "./a.png";
import google from "./g.png";

const Footer = () => {
    return (
        <div className=" footer flex  justify-between text-white bg-black/90  items-center w-full   mt-20 rounded-t-lg">
            <div className="leftFooter w-1/4 flex flex-col items-center text-center shrink-0 pl-14">
                <h4 className="font-bold  md:block hidden text-2xl  font-oxygen">
                    DOWNLOAD OUR APP
                </h4>
                <p className="text-sm">
                    Download App for Android and IOS Phones phone
                </p>
                {/* <img src={apple} alt="" className="w-48 m-2" /> */}
                <img src={google} alt="" className="w-48 mt-2" />
            </div>
            <div className="MiddleFooter w-2/5 flex flex-col items-center shrink-0 p-4">
                <h1 className="font-bold  sm:text-3xl md:text-4xl m-5 font-monoton">
                    ShopHaven
                </h1>
                <p className="md:font-semibold pt-1 text-lg sm:text-sm mb-1 text-center">
                    High Quality is our first Priority
                </p>
            </div>
            <div className="rightFooter w-1/4 flex flex-col items-center ">
                <h4 className="font-bold text-2xl m-3 font-oxygen text-center">
                    Follow Us
                </h4>
                <a
                    className="font-semibold hover:text-red-500 text-lg transition-all duration-700 ease-in-out"
                    href="/"
                >
                    Instagram
                </a>
                <a
                    className="font-semibold hover:text-red-500 text-lg transition-all duration-700 ease-in-out"
                    href="/"
                >
                    Youtube
                </a>
            </div>
        </div>
    );
};

export default Footer;
