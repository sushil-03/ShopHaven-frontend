import React, { useState } from "react";
import { motion } from "framer-motion";

import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Backdrop from "@mui/material/Backdrop";
import { useSelector, useDispatch } from "react-redux";

const UserOption = ({ user }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const rootWidth = document.getElementById("root").clientWidth;
    const rootHeight = document.getElementById("root").clientHeight;
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: (
                <LocalMallIcon
                    style={{ color: cartItems.length > 0 ? "red" : "unset" }}
                />
            ),
            name: `Cart (${cartItems ? cartItems.length : 0})`,
            func: cart,
        },
        { icon: <LogoutIcon />, name: "Logout", func: logOut },
    ];
    if (user?.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    function orders() {
        navigate("/orders");
    }
    function account() {
        navigate("/account");
    }
    function cart() {
        navigate("/cart");
    }
    function dashboard() {
        navigate("/admin/dashboard");
    }
    function logOut() {
        dispatch(logout());
        alert.success("Log Out Successfully");
    }
    return (
        <div id="ddd" className=" z-40 fixed">
            <Backdrop open={open} className="z-1" />
            <motion.div
                className="absolute z-100"
                drag
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: rootWidth - 100,
                    bottom: rootHeight - 500,
                }}
            >
                <SpeedDial
                    className="bg-transparent"
                    ariaLabel="SpeedDial ToolTip"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    direction="down"
                    icon={
                        <>
                            <div className="absolute bg-transparent w-full h-full z-50"></div>
                            <img
                                className="speedDialIcon rounded-full shadow-md hover:border-2 select-none  bg-[#7960dc] w-full h-full"
                                onDrag={(e) => {
                                    e.preventDefault();
                                }}
                                src={user.avatar.url}
                                alt="Profile"
                            />
                        </>
                    }
                >
                    {options.map((option, key) => (
                        <SpeedDialAction
                            icon={option.icon}
                            key={key}
                            tooltipTitle={option.name}
                            onClick={option.func}
                        ></SpeedDialAction>
                    ))}
                </SpeedDial>
            </motion.div>
        </div>
    );
};

export default UserOption;
