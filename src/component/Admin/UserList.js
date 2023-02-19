import React, { useEffect } from "react";
import MetaData from "../layout/MetaData.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar.js";
import { clearError } from "../../actions/orderAction";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  getallUser,
  deleteUser,
  updateUser,
} from "../../actions/userAction.js";
import {
  DELETE_USER_RESET,
  UPDATE_USER_ROLE_RESET,
} from "../../constants/userConstant.js";
import Edit from "@mui/icons-material/Edit";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    isDeleted,
    error: deleteError,
    message,
    isUpdated,
  } = useSelector((state) => state.profile);
  useEffect(() => {
    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_USER_RESET });
      navigate("/admin/users");
    }
    if (isUpdated) {
      alert.success("Role Updated");
      dispatch({ type: UPDATE_USER_ROLE_RESET });
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearError());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getallUser());
  }, [
    dispatch,
    alert,
    error,
    message,
    deleteError,
    isDeleted,
    navigate,
    isUpdated,
  ]);
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const updateUserHandler = (id, name, email, role) => {
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    if (role === "user") {
      role = "admin";
    } else {
      role = "user";
    }
    myForm.set("role", role);
    dispatch(updateUser(id, myForm));
  };
  const column = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.8 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
      type: "number",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 270,
      flex: 0.3,
      type: "number",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") !== "ADMIN"
          ? "text-green-500  uppercase text-bold"
          : "text-red-600 uppercase";
      },
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={() =>
                updateUserHandler(
                  params.getValue(params.id, "id"),
                  params.getValue(params.id, "name"),
                  params.getValue(params.id, "email"),
                  params.getValue(params.id, "role")
                )
              }
            >
              <Edit className="text-blue-600" />
            </Button>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon className="text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    });
  return (
    <div>
      <MetaData title="All Users" />
      <div className="w-screen h-screen m-auto grid place-items-center mt-10 border-t-2 overflow-scroll">
        <div className="border w-full h-full flex ">
          <div className="md:w-1/6 w-1/4">
            <SideBar />
          </div>
          <div className="md:w-5/6 w-3/4  px-4 ">
            <div className="header text-center font-roboto font-semibold ">
              <h2 className="text-3xl my-3">ALL Users </h2>
              <DataGrid
                rows={rows}
                columns={column}
                disableSelectionOnClick
                autoHeight
                sx={{
                  "& .MuiDataGrid-cell:hover": {
                    color: "primary.main",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "red",
                    font: "bold",
                    fontSize: "1.3rem",
                    fontWeight: "600",
                  },
                }}
                className="font-roboto "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
