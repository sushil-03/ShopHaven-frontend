import React, { useState, useEffect } from "react";
import TextField from "../layout/common/TextField";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/loader.js";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.success(error.message);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(loadUser());
      navigate("/");
    }
  }, [dispatch, error, alert, message, navigate]);

  const ForgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-screen h-screen m-auto">
          <div className="container  w-full  flex  border-2 h-4/5 m-auto shadow-2xl  justify-center items-center p-4">
            <div className="right my-auto md:w-2/5">
              <div className="heading p-4">
                <p className=" text-4xl text-[#7960dc] font-semibold font-roboto">
                  Forgot Password
                </p>
              </div>
              <div className="form mt-10">
                <form
                  onSubmit={ForgotPasswordSubmit}
                  className="w-[18rem] relative"
                >
                  <div className="w-full h-16  relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out ">
                    <HiOutlineMail
                      className=" bg-white left-4 bg-tranpparent absolute "
                      size="2rem"
                    />
                    <TextField
                      name="oldPass"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </div>

                  <div className="btn mt-10 flex  font-oxygen items-center justify-center">
                    <button
                      className=" ml-5 border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985] w-[10rem]"
                      onClick={(e) => ForgotPasswordSubmit(e)}
                    >
                      Send
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

export default ResetPassword;
