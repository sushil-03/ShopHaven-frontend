import React, { useState, useEffect } from "react";
import TextField from "../layout/common/TextField";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/loader.js";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLocation } from "react-router-dom";
const LoginSignUp = (props) => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [toggle, setToggle] = useState(true);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [pass, showPass] = useState("password");
    const changeShowPass = () => {
        showPass(pass === "password" ? "text" : "password");
    };
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("/profile.png");

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );
    const redirect = search ? `/${search.split("=")[1]}` : "/account";
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPass));
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="w-screen h-screen m-auto">
                    <div className="container  w-full  flex  border-2 h-4/5 m-auto shadow-2xl md:justify-start justify-center">
                        <div className="left md:block hidden w-3/5 m-auto">
                            <img
                                src="https://res.cloudinary.com/dlv5hu0eq/image/upload/v1655021399/basicData/sign_qpy02o.webp"
                                alt=""
                            />
                        </div>
                        <div className="right my-auto md:w-2/5">
                            <div className="heading p-4">
                                <p className=" text-4xl text-[#7960dc] font-semibold font-roboto">
                                    Welcome to Family
                                </p>
                                <p className="text-gray-500 mt-2 md:text-left text-center">
                                    Discover something new
                                </p>
                            </div>
                            <div className="form mt-10">
                                {toggle ? (
                                    <form
                                        onSubmit={loginSubmit}
                                        className="w-4/5  relative"
                                    >
                                        <div className="w-full h-16  relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out">
                                            <HiOutlineMail
                                                className=" bg-white left-4 bg-transparent absolute "
                                                size="2rem"
                                            />
                                            <TextField
                                                placeholder="Email Address"
                                                value={loginEmail}
                                                onChange={(e) =>
                                                    setLoginEmail(
                                                        e.target.value
                                                    )
                                                }
                                                type="email"
                                            />
                                        </div>
                                        <div className="w-full h-16    relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out mt-2">
                                            <RiLockPasswordLine
                                                className=" bg-white left-4 bg-transparent absolute "
                                                size="2rem"
                                            />
                                            <TextField
                                                // name="passsword"
                                                placeholder="Password"
                                                value={loginPass}
                                                onChange={(e) =>
                                                    setLoginPass(e.target.value)
                                                }
                                                type={pass}
                                            />
                                            <div
                                                className="absolute right-5 transition-all ease-in-out duration-200"
                                                onClick={changeShowPass}
                                            >
                                                {pass === "text" ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </div>
                                        </div>
                                        {/* <div className=" ">
                      <Link
                        to="/password/forgot"
                        className="m-auto right-0 absolute font-roboto"
                      >
                        Forgot Password ?
                      </Link>
                    </div> */}
                                        <div className="btn mt-10 flex  font-oxygen items-center justify-center">
                                            <button
                                                className="  border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985] "
                                                onClick={loginSubmit}
                                            >
                                                Sign In Now
                                            </button>
                                            <button
                                                className="  ml-5 rounded-md border px-4 py-2  shadow-lg"
                                                onClick={() => setToggle(false)}
                                            >
                                                Get Register
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // sign in***********************************************************
                                    <form
                                        onSubmit={registerSubmit}
                                        className="w-[18rem] relative"
                                    >
                                        <div className="w-full h-16  relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out ">
                                            <CgProfile
                                                className=" bg-white left-4 bg-tranpparent absolute "
                                                size="2rem"
                                            />
                                            <TextField
                                                name="name"
                                                placeholder="Name"
                                                value={name}
                                                onChange={registerDataChange}
                                                type="text"
                                            />
                                        </div>
                                        <div className="w-full h-16  relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out mt-2">
                                            <HiOutlineMail
                                                className=" bg-white left-4 bg-transparent absolute "
                                                size="2rem"
                                            />
                                            <TextField
                                                name="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={registerDataChange}
                                                type="email"
                                            />
                                        </div>

                                        <div className="w-full h-16 relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out mt-2">
                                            <RiLockPasswordLine
                                                className=" bg-white left-4 bg-transparent absolute "
                                                size="2rem"
                                            />
                                            <TextField
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={registerDataChange}
                                                type={pass}
                                            />
                                            <div
                                                className="absolute right-5 transition-all ease-in-out duration-200"
                                                onClick={changeShowPass}
                                            >
                                                {pass === "text" ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full h-16 border relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out mt-2 ">
                                            <img
                                                src={avatar}
                                                alt=""
                                                className="w-16 h-14"
                                            />
                                            <input
                                                name="avatar"
                                                accept="image/*"
                                                onChange={registerDataChange}
                                                type="file"
                                                className="ml-2"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Size should be less than 700KB
                                        </span>
                                        <div className="btn mt-10 flex  font-oxygen items-center justify-center">
                                            <button
                                                className="    rounded-md border px-4 py-2  shadow-lg "
                                                onClick={() => setToggle(true)}
                                            >
                                                Sign Up Now
                                            </button>
                                            <button
                                                className=" ml-5 border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985]"
                                                onClick={(e) =>
                                                    registerSubmit(e)
                                                }
                                            >
                                                Get Login
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginSignUp;
