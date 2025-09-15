import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../app/slice/wishlistSlice";
import "./WishlistPage.css";
import { useNavigate } from "react-router";
import { addToCart } from "../app/slice/cartSlice";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty ❤️</h2>
        <button className="btn primary" onClick={() => navigate("/")}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">My Wishlist</h2>

      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div className="wishlist-item" key={item.id}>
            <img src={item.image} alt={item.title} className="wishlist-img" />

            <div className="wishlist-info">
              <h3 className="wishlist-name">{item.title}</h3>
              <p className="wishlist-brand">{item.brand}</p>
              <p className="wishlist-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="wishlist-actions">
              <button
                className="btn primary"
                onClick={() => dispatch(addToCart(item))}
              >
                Move to Cart 🛒
              </button>
              <button
                className="btn outline"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-footer">
        <button
          className="btn outline danger"
          onClick={() => dispatch(clearWishlist())}
        >
          Clear Wishlist
        </button>
      </div>
    </div>
  );
}
