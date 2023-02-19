import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { Image, Breathing } from "react-shimmer";

const ProductCard = ({ product }) => {
    return (
        <>
            <Link
                to={`/product/${product._id}`}
                className=" text-[rgb(48,48,48)]  flex flex-col transition-all shadow-md duration-200 pb-3 rounded-lg  w-[20rem]  h-[27rem] flex-wrap  justify-between relative border hover:bg-gray-200 hover:border-2 hover:border-gray-300 group"
            >
                <div>
                    <div className=" object-fit rounded-t-lg  z-30 absolute w-full h-5/6 top-0 p-1">
                        <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fallback={<Breathing width={400} height={432} />}
                        />
                    </div>

                    <div className=" gap-2 p-8  h-20 absolute w-full bottom-4">
                        <div className="text-center flex justify-around w-full flex-col items-center p-2">
                            <span className="sm:text-base text-sm font-roboto uppercase text-center w-full  ">
                                {product.name}
                            </span>
                            <span className="font-semibold text-[#f50157] text-lg ">{`₹${product.price}`}</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0">
                        <div className="  hidden group-hover:flex items-center gap-1 p-2">
                            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <AiOutlineHeart
                                    size={20}
                                    color="red"
                                    fill="red"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ProductCard;
