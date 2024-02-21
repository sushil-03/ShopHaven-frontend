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
      let descriptionItem = [];
      if (product && product.description) {
        descriptionItem = product.description.split("$");
      }
      let description = descriptionItem.join("\n");
      setName(product.name);
      setPrice(product.price);
      setStock(product.Stock);
      setDescription(description);
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
      <div className="grid w-screen h-screen m-auto mt-10 overflow-scroll border-t-2 place-items-center">
        <div className="flex w-full h-full border ">
          <div className="w-1/4 md:w-1/6">
            <SideBar />
          </div>
          <div className="w-3/4 px-4 md:w-5/6 md:border-l-2">
            <div className="font-semibold text-center header font-roboto ">
              <h2 className="my-3 text-3xl font-roboto">UPDATE PRODUCTS</h2>
              <div className="flex flex-col w-5/6 gap-5 p-5 pt-10 m-auto mt-10 border rounded-lg shadow-lg md:w-1/2">
                <div className="flex items-center gap-4 overflow-scroll md:gap-8">
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

                <div className="flex flex-col justify-between gap-8 md:flex-row">
                  <div className="flex items-center gap-4 md:gap-8">
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
                  <div className="flex items-center gap-4 md:gap-8">
                    <StorageIcon />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={stock}
                      className="h-full w-full border  font-roboto p-3  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                  <DescriptionIcon />
                  <textarea
                    type="text"
                    placeholder="Product Description"
                    value={description}
                    cols={30}
                    rows={6}
                    className="h-full border  w-full font-roboto p-3  rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4 rounded-lg outline-none md:gap-8">
                  <AccountTreeIcon />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-4 border"
                  >
                    <option value=""> Choose Category</option>
                    {categories.map((cate, key) => (
                      <option key={cate}>{cate}</option>
                    ))}
                  </select>
                </div>

                <div className="">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/"
                    onChange={createProductImageChange}
                    multiple
                    className="border "
                  />
                </div>
                <div className="flex flex-wrap gap-5">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        src={image.url}
                        alt="Avatar Preview"
                        key={image}
                        className="w-20 h-20 "
                      />
                    ))}
                  {imagePreview.map((image, index) => (
                    <img
                      src={image}
                      alt="Avatar Preview"
                      key={image}
                      className="w-20 h-20 "
                    />
                  ))}
                </div>
                <button
                  onClick={updateProductSubmitHandler}
                  type="submit "
                  disabled={loading ? true : false}
                  className="p-3 text-xl text-white bg-red-500 border rounded-lg hover:bg-red-700 font-roboto"
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
