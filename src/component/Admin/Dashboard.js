import React, { useEffect } from "react";
import SideBar from "./SideBar.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllProductAdmin } from "../../actions/productAction.js";
// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement)
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
} from "chart.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getallUser } from "../../actions/userAction.js";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { users } = useSelector((state) => state.allUsers);
    const { orders } = useSelector((state) => state.allOrders);
    useEffect(() => {
        dispatch(getAllProductAdmin());
        dispatch(getallUser());
        dispatch(getAllOrders());
    }, [dispatch]);
    let total = 0;
    orders &&
        orders.forEach((order) => {
            total += order.totalPrice;
        });
    total = Math.floor(total);
    let OutofStock = 0;
    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                OutofStock++;
            }
        });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                // hoverBackgroundColor: ["red"],
                data: [0, total],
            },
        ],
    };
    const doughnutState = {
        labels: ["Out Of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 205, 86)"],
                hoverOffset: 4,

                data: [OutofStock, products ? products.length - OutofStock : 0],
            },
        ],
    };
    return (
        <div className="w-screen h-screen m-auto grid place-items-center mt-10 border-t-2 overflow-scroll">
            <div className="border w-full h-full flex ">
                <div className="md:w-1/6 w-1/4">
                    <SideBar />
                </div>
                <div className="md:w-5/6 w-3/4  px-2 border-l-2">
                    <div className="header text-center font-roboto font-semibold ">
                        <h2 className="text-3xl my-3">Dashboard</h2>
                        <p className="bg-red-500 text-white py-4 rounded-lg text-xl ">
                            {`Total Amount : ₹${total}`}
                        </p>
                    </div>
                    <div className="detail flex justify-around mt-5  text-center font-roboto font-bold text-xl text-white ">
                        <Link
                            to="/admin/products"
                            className="text-center md:pt-12 md:w-40 md:h-40 w-28 h-28 pt-6 border rounded-full bg-[#74BDCB] shadow-lg"
                        >
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link
                            to="/admin/orders"
                            className=" text-center md:pt-12 md:w-40 md:h-40 w-28 h-28 pt-6 rounded-full bg-[#FFA384] shadow-lg"
                        >
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>

                        <Link
                            to="/admin/users"
                            className=" text-center md:pt-12 md:w-40 md:h-40 w-28 h-28 pt-6 rounded-full bg-[#EFE7BC] shadow-lg"
                        >
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                    <div>
                        <div className=" md:w-9/12 w-11/12 my-4 grid place-items-center mx-auto">
                            <Line data={lineState} />
                        </div>

                        <div className=" w-[30vmax]  my-4 grid place-items-center mx-auto">
                            <Doughnut data={doughnutState} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
