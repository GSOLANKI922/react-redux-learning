import React, { useState } from "react";
import "./Header.css";
import DebouncedSearch from "./DebouncedSearch";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../app/slice/productSlice";
import { LIMIT } from "../constatnt";
import DebounceInput from "./DebouncedSearch";
import { useNavigate } from "react-router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, limit, loading } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">MyShop</div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* Search */}
        <div className="search-box">
          {/* <DebouncedSearch
            onSearch={(val) => {
              if (loading) return;
              dispatch(getProduct({ page: +page, limit: +limit, search: val }));
            }}
          /> */}
          <DebounceInput
            onSearch={(val) => {
              if (loading) return;
              dispatch(getProduct({ page: +page, limit: +limit, search: val }));
            }}
            delay={600} // optional
            placeholder="Search products..."
          />
        </div>

        {/* Actions */}
        <div className="header-actions">
          <button className="action-btn" onClick={() => navigate("/cart")}>
            🛒 Cart ({cartItems.length})
          </button>
          <button className="action-btn" onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist ({wishlistItems.length})
          </button>
          <button className="action-btn">👤 Login</button>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
