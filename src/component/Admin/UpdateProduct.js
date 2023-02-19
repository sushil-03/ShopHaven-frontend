import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import SideBar from "./SideBar.js";
import { clearError } from "../../actions/orderAction";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StorageIcon from "@mui/icons-material/Storage";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant.js";
import {
  updateProduct,
  getProductDetails,
} from "../../actions/productAction.js";

const UpdateProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("Xbox");
  const [price, setPrice] = useState(200);
  const [stock, setStock] = useState(10);
  const [description, setDescription] = useState("Niece one");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const categories = [
    "All Product",
    "Phones",
    "Ipad",
    "Laptop",
    "Desktop",
    "Watches",
    "Accessories",
  ];
  const [category, setCategory] = useState("All Product");
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { product } = useSelector((state) => state.productDetail);
  const [images, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [oldImages, setOldImage] = useState([]);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setStock(product.Stock);
      setDescription(product.description);
      setCategory(product.category);
      setOldImage(product.images);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Product updated Successfully ");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, alert, updateError, navigate, isUpdated, id, product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", stock);
    images &&
      images.forEach((image) => {
        myForm.append("images", image);
      });
    dispatch(updateProduct(myForm, id));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage([]);
    setImagePreview([]);
    setOldImage([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage((old) => [...old, reader.result]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div>
      <MetaData title="Create Products" />
      <div className="w-screen h-screen m-auto grid place-items-center mt-10 border-t-2 overflow-scroll">
        <div className="border w-full h-full flex ">
          <div className="md:w-1/6 w-1/4">
            <SideBar />
          </div>
          <div className="md:w-5/6 w-3/4  px-4 md:border-l-2">
            <div className="header text-center font-roboto font-semibold ">
              <h2 className="text-3xl my-3 font-roboto">UPDATE PRODUCTS</h2>
              <div className="  w-min m-auto pt-5 flex gap-5 flex-col border px-16 pb-10 shadow-lg rounded-lg">
                <div className="flex md:gap-8 gap-4 items-center  overflow-scroll">
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    className="h-full w-full  p-3 border font-roboto   rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex md:gap-8 gap-4 items-center">
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    value={price}
                    className="h-full border w-full font-roboto p-3  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="flex md:gap-8 gap-4 items-center">
                  <DescriptionIcon />
                  <textarea
                    type="text"
                    placeholder="Product Description"
                    value={description}
                    cols={19}
                    row={5}
                    className="h-full border  w-full font-roboto p-3  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex md:gap-8 gap-4 items-center rounded-lg outline-none">
                  <AccountTreeIcon />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 w-full border"
                  >
                    <option value=""> Choose Category</option>
                    {categories.map((cate, key) => (
                      <option key={cate}>{cate}</option>
                    ))}
                  </select>
                </div>

                <div className="flex md:gap-8 gap-4 items-center">
                  <StorageIcon />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    className="h-full w-full border  font-roboto p-3  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/"
                    onChange={createProductImageChange}
                    multiple
                    className=" border"
                  />
                </div>
                <div className="flex gap-5  flex-wrap">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        src={image.url}
                        alt="Avatar Preview"
                        key={image}
                        className=" w-20 h-20 "
                      />
                    ))}
                  {imagePreview.map((image, index) => (
                    <img
                      src={image}
                      alt="Avatar Preview"
                      key={image}
                      className=" w-20 h-20 "
                    />
                  ))}
                </div>
                <button
                  onClick={updateProductSubmitHandler}
                  type="submit "
                  disabled={loading ? true : false}
                  className="border p-3 bg-red-500 hover:bg-red-700 text-white font-roboto text-xl rounded-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
