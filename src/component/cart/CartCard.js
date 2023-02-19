import React from "react";
import { Link } from "react-router-dom";
import { addItemsToCart, removeItemFromCart } from "../../actions/cartAction";
import { useDispatch } from "react-redux";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    const newQty = item.quantity - 1;
    if (newQty < 1) {
      return;
    }
    dispatch(addItemsToCart(item.product_id, newQty));
  };
  const increaseQuantity = () => {
    const newQty = item.quantity + 1;
    if (newQty > item.stock) {
      return;
    }
    dispatch(addItemsToCart(item.product_id, newQty));
  };
  const removeItem = () => {
    dispatch(removeItemFromCart(item.product_id));
  };
  return (
    <div className="flex mt-4 mb-4 justify-center">
      <div className="detail w-2/4 flex md:flex-row flex-col pl-4">
        <img src={item.image} alt="" className="w-20 h-20 object-fit" />
        <div className="text flex  flex-col justify-center p-2">
          <Link
            to={`/product/${item.product_id}`}
            className="font-roboto cursor-pointer"
          >
            {item.name}
          </Link>
          <span className=" font-roboto cursor-pointer sm:hidden block">
            Price: ₹{item.price}
          </span>
          <span
            className="text-red-600 font-roboto cursor-pointer"
            onClick={removeItem}
          >
            Remove
          </span>
        </div>
      </div>
      <div className="quantity w-1/4">
        <button
          className="font-bold rounded-full md:w-7 md:h-7  md:bg-slate-400 "
          onClick={decreaseQuantity}
        >
          -
        </button>
        <input
          type="number"
          readOnly
          value={item.quantity}
          className="md:w-16 w-9 outline-none border-none text-center"
        />
        <button
          className="font-bold rounded-full  md:w-7 md:h-7  md:bg-slate-400"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      <div className="price w-1/4 font-roboto sm:block hidden">{`₹${item.price}`}</div>
      <div className="w-1/4 font-roboto">{`₹${
        item.price * item.quantity
      }`}</div>
    </div>
  );
};

export default CartCard;
