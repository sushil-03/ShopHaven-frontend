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
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant.js";
import { newProduct } from "../../actions/productAction.js";

const NewProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [description, setDiscription] = useState("");
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
    const { loading, error, success } = useSelector(
        (state) => state.newProduct
    );
    const [images, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (success) {
            alert.success("Product created Successfully ");
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/dashboard");
        }
    }, [dispatch, alert, error, navigate, success]);
    const createProductSubmitHandler = (e) => {
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
        dispatch(newProduct(myForm));
    };
    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImage([]);
        setImagePreview([]);
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
                            <h2 className="text-3xl my-3 font-roboto">
                                CREATE PRODUCTS
                            </h2>
                            <div className="  w-min m-auto pt-5 flex gap-5 flex-col border p-5 shadow-lg rounded-lg">
                                <div className="flex md:gap-8 gap-4 items-center  overflow-scroll">
                                    <SpellcheckIcon />
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        required
                                        value={name}
                                        className="h-full w-full  p-3 border font-roboto   rounded-md  focus:outline-none focus:border-[#7960dc] focus:ring-1 focus:ring-[#7960dc]"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setDiscription(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex md:gap-8 gap-4 items-center rounded-lg outline-none">
                                    <AccountTreeIcon />
                                    <select
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        className="p-2 w-full border"
                                    >
                                        <option value="">
                                            {" "}
                                            Choose Category
                                        </option>
                                        {categories.map((cate) => (
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
                                        onChange={(e) =>
                                            setStock(e.target.value)
                                        }
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
                                <div className="flex gap-5  flex-wrap border ">
                                    {imagePreview.map((image, index) => (
                                        <img
                                            src={image}
                                            alt="Avatar Preview"
                                            key={image}
                                            className=" w-20 h-20 "
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    Size should be less than 700KB
                                </span>

                                <button
                                    onClick={createProductSubmitHandler}
                                    type="submit "
                                    disabled={loading ? true : false}
                                    className={`border  bg-red-500 p-3 hover:bg-red-700 text-white font-roboto text-xl rounded-lg flex justify-center items-center gap-4`}
                                >
                                    {loading ? "Creating..." : "Create"}
                                    {loading && (
                                        <div className="w-[2vmax]  h-[2vmax] border-b-4 rounded-full border-[rgb(0,0,0,0.719)] rotation"></div>
                                        // <div className="w-5 h-5 rounded-full border ">
                                        //     {""}
                                        // </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
