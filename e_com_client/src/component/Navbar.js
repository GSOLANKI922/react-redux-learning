import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error, "err");
    }
  };

  return (
    <>
      <nav className="nav-extended #1976d2 blue darken-2 nav_container">
        {token ? (
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              FlipCart
            </Link>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/login">
                <i class="material-icons">home</i>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <i class="material-icons">add_shopping_cart</i>
                </Link>
              </li>

              <li>
                <Link onClick={logoutHandler}>
                  <i class="material-icons">logout</i>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              FlipCart
            </Link>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/singup">Singup</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
