import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PriverRoute = () => {
  const auth = localStorage.getItem("token");
  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PriverRoute;
