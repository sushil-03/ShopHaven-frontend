import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { IoMenuSharp } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Header = ({ isAuthenticated = false }) => {
    const rootWidth = document.getElementById("root").clientWidth;
    const navigate = useNavigate();
    const searchSubmitButton = (args) => {
        console.log("searrch", args);
        if (args.trim()) {
            navigate(`/products/${args}`);
        } else {
            navigate(`/products`);
        }
    };
    const path = window.location.pathname;
    const debounce = function (fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const betterSearch = debounce((val) => {
        searchSubmitButton(val);
    }, 700);

    const [isClick, setClick] = useState(false);
    const boxVariant = {
        hidden: {
            x: 600,
            y: -55,
            height: 0,
            opacity: 0,
        },
        visible: {
            opacity: 1,
            x: rootWidth - 210,
            y: -55,
            width: 200,
            height: 240,
            transition: {
                when: "beforeChildren",
                delay: 0.2,
                ease: "easeInOut",
            },
        },
    };

    const listVariant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                ease: "easeInOut",
            },
        },
    };
    return (
        <div className="transition-all duration-500">
            <div className="flex flex-row items-center justify-between h-16 py-0 m-0 navbar px-5">
                <div className="logo h">
                    <Link
                        className="mx-2 md:text-4xl text-2xl select-none font-monoton"
                        to="/"
                    >
                        ShopHaven
                    </Link>
                </div>

                <div className="hidden overflow-hidden link md:block">
                    <ul className="flex gap-2 flex-row justify-between  font-bold  font-oxygen text-[rgb(48,48,48)]">
                        <li className="">
                            <Link
                                to="/"
                                className={`md:px-2 px-4 duration-500 hover:text-purple-500 ${
                                    path === "/"
                                        ? "text-purple-500"
                                        : "text-black"
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="">
                            <Link
                                to="/products"
                                className={`md:px-2 px-4 duration-500 hover:text-purple-500 ${
                                    path === "/products"
                                        ? "text-purple-500"
                                        : "text-black"
                                }`}
                            >
                                Product
                            </Link>
                        </li>
                        <li className="">
                            <Link
                                to="/contact"
                                className={`md:px-2 px-4 duration-500 hover:text-purple-500 ${
                                    path === "/contact"
                                        ? "text-purple-500"
                                        : "text-black"
                                }`}
                            >
                                Contact
                            </Link>
                        </li>
                        <li className="">
                            <Link
                                to="/account"
                                className={`md:px-2 px-4 duration-500 hover:text-purple-500 ${
                                    path === "/account"
                                        ? "text-purple-500"
                                        : "text-black"
                                }`}
                            >
                                Account
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mr-2 icons  md:w-1/6 sm:w-1/2">
                    <IconContext.Provider
                        value={{
                            size: "1.5rem",
                            className:
                                "font-medium mx-2 cursor-pointer hover:text-red-500 transition-all duration-500 ",
                        }}
                    >
                        <div className="flex flex-row justify-end items-center gap-1  ">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search a Product"
                                onKeyUp={(e) => betterSearch(e.target.value)}
                                className={`border-b border-purple-800 outline-none flex-shrink-1 text-sm sm:p-1 inline w-full `}
                            />
                            <div className="hidden md:flex flex-row items-center gap-0">
                                <Link to="/cart">
                                    <LocalMallIcon />
                                </Link>
                                {!isAuthenticated && (
                                    <Link to="/login">
                                        <CgLogIn size="1.5rem" />
                                    </Link>
                                )}
                            </div>

                            <div
                                className="text-lg resonsive md:hidden z-50"
                                onClick={(click) => setClick(!isClick)}
                            >
                                {isClick ? (
                                    <RiCloseFill size="1.5rem" color="white" />
                                ) : (
                                    <IoMenuSharp size="1.5rem" />
                                )}
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
            {isClick ? (
                <motion.div
                    className="md:hidden w-30 absolute z-30 bg-slate-900 rounded-lg"
                    variants={boxVariant}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        type: "spring",
                        stiffness: 60,
                    }}
                >
                    <ul className="p-4 text-[#eee7e7] font-bold">
                        <Link to="/" className="flex items-center gap-5 py-1">
                            <motion.span
                                className="text-lg"
                                variants={listVariant}
                            >
                                Home&nbsp;&nbsp;&nbsp;
                            </motion.span>
                        </Link>
                        <Link
                            to="/products"
                            className="flex items-center gap-5 py-1"
                        >
                            <motion.span
                                className="text-lg"
                                variants={listVariant}
                            >
                                Product
                            </motion.span>
                        </Link>
                        <Link
                            to="/account"
                            className="flex items-center gap-4 py-1"
                        >
                            <motion.span
                                className="text-lg"
                                variants={listVariant}
                            >
                                Account
                            </motion.span>
                        </Link>
                        <Link
                            to="/contact"
                            className="flex items-center gap-4 py-1"
                        >
                            <motion.span
                                className="text-lg"
                                variants={listVariant}
                            >
                                Contact
                            </motion.span>
                        </Link>
                        <Link
                            to="/cart"
                            className="flex items-center gap-4 py-1"
                        >
                            <motion.span
                                className="text-lg"
                                variants={listVariant}
                            >
                                Cart
                            </motion.span>
                        </Link>
                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                className="flex items-center gap-4 py-1"
                            >
                                <motion.span
                                    className="text-lg"
                                    variants={listVariant}
                                >
                                    Login
                                </motion.span>
                            </Link>
                        )}
                    </ul>
                </motion.div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Header;
