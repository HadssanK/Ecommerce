import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

const ProtectedRoute = ({ children }) => {
  const isLoggedin = useAuth();

  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
