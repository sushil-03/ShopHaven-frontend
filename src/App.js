import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Home from "./component/Home/Home.js";
import ProductDetail from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOption from "./component/layout/UserOption";
import Contact from "./component/layout/Contact.js";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import RestPassword from "./component/User/ResetPassword.js";
import Cart from "./component/cart/Cart.js";

import ConfirmOrder from "./component/cart/ConfirmOrder.js";
import Payment from "./component/cart/Payment.js";
import OrderSuccess from "./component/cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import UpdateOrder from "./component/Admin/UpdateOrder.js";
import UserList from "./component/Admin/UserList.js";
import ReviewList from "./component/Admin/ReviewList.js";

//For Payment

import OrderList from "./component/Admin/OrderList.js";
//Getting font
import Shipping from "./component/cart/Shipping.js";
// const Shipping = lazy(() => import("./component/cart/Shipping.js"));

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Roboto",
          "Monoton",
          "Droid Sans",
          "Chilanka",
          "Eczar",
          "Rancho",
          "Oxygen",
        ],
      },
    });

    store.dispatch(loadUser());
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      {isAuthenticated && <UserOption user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/products/:page" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<RestPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile user={user} />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>{" "}
        <Route element={<ProtectedRoute />}>
          <Route path="/order/payment" element={<OrderSuccess />} />
        </Route>
        {/* <Route
                    path="process/payment"
                    element={
                        stripeApiKey && (
                            <Elements stripe={loadStripe(stripeApiKey)}>
                                <Payment />
                            </Elements>
                        )
                    }
                ></Route> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/products" element={<ProductList />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/order/:id" element={<UpdateOrder />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/users" element={<UserList />} />
        </Route>
        <Route isAdmin={true} element={<ProtectedRoute />}>
          <Route path="/admin/review" element={<ReviewList />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
