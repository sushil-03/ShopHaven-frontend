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
          <div className="container  w-full  flex  border-2 h-4/5 m-auto shadow-2xl  justify-center">
            {/* <div className="left md:block hidden w-3/5 m-auto">
              <img src="/sign.png" alt="" />
            </div> */}
            <div className="right my-auto md:w-2/5">
              <div className="heading p-4">
                <p className=" text-4xl text-[#7960dc] font-semibold font-roboto">
                  Update Profile
                </p>
              </div>
              <div className="form mt-10">
                <form
                  onSubmit={UpdateProfileSubmit}
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
                      onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </div>

                  <div className="w-full h-16 border relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out mt-2 ">
                    <img src={avatar} alt="" className="w-16 h-14" />
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
                  <div className="btn mt-10 flex  font-oxygen items-center justify-center">
                    <button
                      className=" ml-5 border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985]"
                      onClick={(e) => UpdateProfileSubmit(e)}
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
