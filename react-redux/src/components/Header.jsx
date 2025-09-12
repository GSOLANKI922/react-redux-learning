import React, { useState } from "react";
import "./Header.css";
import DebouncedSearch from "./DebouncedSearch";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../app/slice/productSlice";
import { LIMIT } from "../constatnt";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { page, limit, loading } = useSelector((state) => state.product);

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
          <DebouncedSearch
            onSearch={(val) => {
              if (loading) return;
              dispatch(getProduct({ page: +page, limit: +limit, search: val }));
            }}
          />
        </div>

        {/* Actions */}
        <div className="header-actions">
          <button className="action-btn">🛒 Cart</button>
          <button className="action-btn">❤️ Wishlist</button>
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
