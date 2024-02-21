import React from "react";
import { Link } from "react-router-dom";
import { addItemsToCart, removeItemFromCart } from "../../actions/cartAction";
import { useDispatch } from "react-redux";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    const newQty = item.quantity - 1;
    if (newQty < 1) {
      dispatch(removeItemFromCart(item.product_id));
    } else dispatch(addItemsToCart(item.product_id, newQty));
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
    <div className="flex justify-center mt-4 mb-4">
      <div className="flex flex-col w-2/4 pl-4 detail md:flex-row">
        <img src={item.image} alt="" className="w-20 h-20 object-fit" />
        <div className="flex flex-col justify-center p-2 text">
          <Link
            to={`/product/${item.product_id}`}
            className="cursor-pointer font-roboto"
          >
            {item.name}
          </Link>
          <span className="block cursor-pointer font-roboto sm:hidden">
            Price: ₹{item.price}
          </span>
          <span
            className="text-red-600 cursor-pointer font-roboto"
            onClick={removeItem}
          >
            Remove
          </span>
        </div>
      </div>
      <div className="w-1/4 quantity">
        <button
          className="font-bold rounded-full md:w-7 md:h-7 md:bg-slate-400 "
          onClick={decreaseQuantity}
        >
          -
        </button>
        <input
          type="number"
          readOnly
          value={item.quantity}
          className="text-center border-none outline-none md:w-16 w-9"
        />
        <button
          className="font-bold rounded-full md:w-7 md:h-7 md:bg-slate-400"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      <div className="hidden w-1/4 price font-roboto sm:block">{`₹${item.price}`}</div>
      <div className="w-1/4 font-roboto">{`₹${
        item.price * item.quantity
      }`}</div>
    </div>
  );
};

export default CartCard;
