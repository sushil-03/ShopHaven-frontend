import React, { useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/loader.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
const Profile = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      alert.success("Login to Access Data");
      // navigate("/login");
    }
  }, [navigate, isAuthenticated, alert]);
  return (
    <div>
      {loading || !user ? (
        <Loader />
      ) : (
        <div className="">
          <MetaData title={`${user.name}'s Profile`} />
          <div className="container w-screen h-screen flex justify-around  pt-24 gap-7">
            <div className="flex flex-col items-center w-1/2 gap-4 ">
              <h1 className="text-gray-400 md:text-4xl text-2xl font-semibold font-roboto md:absolute left-28 top-24">
                My Profile
              </h1>
              <div className="md:w-1/2  md:h-[20rem] ">
                <img
                  src={user.avatar.url}
                  alt=""
                  className=" my-5 w-full h-full  md:rounded-full"
                />
              </div>

              <Link
                to="/me/update"
                className=" border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985] "
              >
                Edit Profile
              </Link>
            </div>
            <div className="details  w-1/2 flex flex-col gap-10 ">
              <div className="">
                <h4 className="text-2xl font-roboto">Full Name</h4>
                <p className="text-gray-400 pl-2">{user.name}</p>
              </div>
              <div>
                <h4 className="text-2xl font-roboto">Email</h4>
                <p className="text-gray-400 pl-2">{user.email}</p>
              </div>
              <div>
                <h4 className="text-2xl font-roboto">Joined On</h4>
                <p className="text-gray-400 pl-2">
                  {String(user.createdAt).substr(0, 10)}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center">
                <Link
                  to="/orders"
                  className=" border px-5 rounded-md py-3 text-lg font-semibold shadow-lg font-roboto text-white bg-[#483985] hover:bg-[#7467a5]"
                >
                  My Order
                </Link>
                <Link
                  to="/password/update"
                  className=" border px-5 rounded-md py-3 text-lg  font-semibold font-roboto shadow-lg text-white bg-[#483985] hover:bg-[#7467a5] m-2"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
