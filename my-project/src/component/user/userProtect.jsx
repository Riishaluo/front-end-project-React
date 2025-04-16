import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userId");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;
