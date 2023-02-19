import React, { useState, useEffect } from "react";
import TextField from "../layout/common/TextField";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, changePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/loader.js";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newConfirmPass, setnewConfirmPass] = useState("");

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.success(error.message);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile Update Successfully ");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPass);
    myForm.set("newPassword", newPass);
    myForm.set("confirmPassword", newConfirmPass);
    dispatch(changePassword(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-screen h-screen m-auto">
          <div className="container  w-full  flex  border-2 h-4/5 m-auto shadow-2xl  justify-center">
            <div className="right my-auto md:w-2/5">
              <div className="heading p-4">
                <p className=" text-4xl text-[#7960dc] font-semibold font-roboto">
                  Update Password
                </p>
              </div>
              <div className="form mt-10">
                <form
                  onSubmit={UpdatePasswordSubmit}
                  className="w-[18rem] relative"
                >
                  <div className="w-full h-16  relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out ">
                    <VpnKeyIcon
                      className=" bg-white left-4 bg-tranpparent absolute "
                      size="2rem"
                    />
                    <TextField
                      name="oldPass"
                      placeholder="Old Password"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="w-full h-16  relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out mt-2">
                    <LockOpenIcon
                      className=" bg-white left-4 bg-transparent absolute "
                      size="2rem"
                    />
                    <TextField
                      name="newPass"
                      placeholder="New Password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="w-full h-16  relative flex justify-center rounded-md items-center  transition-all duration-300 ease-in-out mt-2">
                    <LockIcon
                      className=" bg-white left-4 bg-transparent absolute "
                      size="2rem"
                    />
                    <TextField
                      name="confirmPass"
                      placeholder="Confirm Password"
                      value={newConfirmPass}
                      onChange={(e) => setnewConfirmPass(e.target.value)}
                      type="text"
                    />
                  </div>

                  <div className="btn mt-10 flex  font-oxygen items-center justify-center">
                    <button
                      className=" ml-5 border px-4 rounded-md py-2 shadow-lg text-white bg-[#7960dc] hover:bg-[#483985]"
                      onClick={(e) => UpdatePasswordSubmit(e)}
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

export default UpdatePassword;
