import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = ({ isAdmin, element, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (isAdmin && isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoute;
