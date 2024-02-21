import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { Image, Breathing } from "react-shimmer";

const ProductCard = ({ product }) => {
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className=" text-[rgb(48,48,48)]  flex flex-col transition-all shadow-md duration-200 pb-3 rounded-lg  w-[20rem]  h-[25rem] flex-wrap  justify-between relative border hover:bg-gray-200 hover:border-2 hover:border-gray-300 group"
      >
        <div>
          <div className="absolute top-0 z-30 w-full p-1 rounded-t-lg object-fit h-5/6">
            <Image
              src={product.images[0].url}
              alt={product.name}
              fallback={<Breathing width={330} height={432} />}
            />
          </div>

          <div className="absolute w-full h-20 gap-2 p-8 bottom-4">
            <div className="flex flex-col items-center justify-around w-full p-2 text-center">
              <span className="w-full text-sm text-center uppercase sm:text-base font-roboto ">
                {product.name}
              </span>
              <span className="font-semibold text-[#f50157] text-lg ">{`₹${product.price}`}</span>
            </div>
          </div>
          <div className="absolute top-0 right-0">
            <div className="items-center hidden gap-1 p-2 group-hover:flex">
              <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                <AiOutlineHeart size={20} color="red" fill="red" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
