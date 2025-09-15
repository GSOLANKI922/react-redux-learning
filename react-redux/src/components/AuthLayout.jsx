import React from "react";
import "./AuthLayout.css"; // optional styling
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  // If you want to redirect logged-in users away from auth pages:
  const isAuthenticated = false; // replace with redux/selector/context

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  console.log(isAuthenticated, "isAuthenticated");

  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* Branding / Sidebar */}
        <div className="auth-sidebar">
          <h1 className="logo">MyShop</h1>
          <p>Welcome back! Please login or register to continue.</p>
        </div>

        {/* Form area */}
        <div className="auth-form">
          <Outlet /> {/* <Login /> or <Register /> will render here */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
