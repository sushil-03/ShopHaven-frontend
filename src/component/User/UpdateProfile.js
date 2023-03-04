import React, { useState, useEffect } from "react";
import TextField from "../layout/common/TextField";
import { HiOutlineMail } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/loader.js";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("/profile.png");

    const { user } = useSelector((state) => state.user);

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatar(user.avatar.url);
        }
        if (error) {
            dispatch(clearError());
        }
        if (isUpdated) {
            alert.success("Profile Update Successfully ");
            dispatch(loadUser());
            navigate("/account");
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, alert, isUpdated, navigate, user]);

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const UpdateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="w-screen h-screen m-auto">
                    <div className="container flex justify-center w-full m-auto border-2 shadow-2xl h-4/5">
                        {/* <div className="hidden w-3/5 m-auto left md:block">
              <img src="/sign.png" alt="" />
            </div> */}
                        <div className="my-auto right md:w-2/5">
                            <div className="p-4 heading">
                                <p className=" text-4xl text-[#7960dc] font-semibold font-roboto">
                                    Update Profile
                                </p>
                            </div>
                            <div className="mt-10 form">
                                <form
                                    onSubmit={UpdateProfileSubmit}
                                    className="w-[18rem] relative"
                                >
                                    <div className="relative flex items-center justify-center w-full h-16 transition-all duration-300 ease-in-out rounded-md ">
                                        <CgProfile
                                            className="absolute bg-white  left-4 bg-tranpparent"
                                            size="2rem"
                                        />
                                        <TextField
                                            name="name"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            type="text"
                                        />
                                    </div>
                                    <div className="relative flex items-center justify-center w-full h-16 mt-2 transition-all duration-300 ease-in-out rounded-md">
                                        <HiOutlineMail
                                            className="absolute bg-transparent bg-white  left-4"
                                            size="2rem"
                                        />
                                        <TextField
                                            name="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            type="email"
                                        />
                                    </div>

                                    <div className="relative flex items-center justify-center w-full h-16 mt-2 transition-all duration-300 ease-in-out border rounded-md ">
                                        <img
                                            src={avatar}
                                            alt=""
                                            className="w-16 h-14"
                                        />
                                        <input
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange}
                                            type="file"
                                            className="ml-2"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Size should be less than 700KB
                                    </span>
                                    <div className="flex items-center justify-center mt-10 btn font-oxygen">
                                        <button
                                            className=" ml-5 border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985]"
                                            onClick={(e) =>
                                                UpdateProfileSubmit(e)
                                            }
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateProfile;
