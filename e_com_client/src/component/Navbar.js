import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Search from "./Search";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    try {
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      console.log(error, "err");
    }
  };

  return (
    <>
      <nav className="nav-extended #1976d2 blue darken-2 nav_container">
        <div className="nav-wrapper" style={{ margin: "0 30px" }}>
          <Link
            to="/"
            className="brand-logo"
            style={{ textDecoration: "none" }}
          >
            FlipCart
          </Link>
          {token ? (
            <>
              <ul id="nav-mobile" className="right">
                <li>
                  <i className="material-icons" style={{display:"flex", alignItems:"center"}}>
                    <Category />
                  </i>
                </li>
                <li>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <i className="material-icons">home</i>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    <i className="material-icons">add_shopping_cart</i>
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={logoutHandler}
                    style={{ textDecoration: "none" }}
                  >
                    <i className="material-icons">logout</i>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/singup" style={{ textDecoration: "none" }}>
                    Singup
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
