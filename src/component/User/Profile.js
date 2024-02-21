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
          <div className="container flex flex-col items-center justify-around w-screen h-screen pt-24 md:items-start gap-7 md:flex-row">
            <div className="flex flex-col items-center w-1/2 gap-4 ">
              <h1 className="text-2xl font-semibold text-gray-400 md:text-4xl font-roboto md:absolute left-28 top-24">
                My Profile
              </h1>
              <div className="relative md:w-[350px] w-[250px]  md:h-[350px] h-[250px] md:rounded-full overflow-hidden">
                <img
                  src={user.avatar.url}
                  alt="profile"
                  className="object-contain w-full h-full "
                />
              </div>

              <Link
                to="/me/update"
                className=" border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985] "
              >
                Edit Profile
              </Link>
            </div>
            <div className="flex flex-col w-1/2 gap-10 details ">
              <div className="">
                <h4 className="text-2xl font-roboto">Full Name</h4>
                <p className="pl-2 text-gray-400">{user.name}</p>
              </div>
              <div>
                <h4 className="text-2xl font-roboto">Email</h4>
                <p className="pl-2 text-gray-400">{user.email}</p>
              </div>
              <div>
                <h4 className="text-2xl font-roboto">Joined On</h4>
                <p className="pl-2 text-gray-400">
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
