import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../app/slice/cartSlice";
import { addToWishlist } from "../app/slice/wishlistSlice";

export default function ProductCard({ product, deleteProduct }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, price, rating, images, brand, stock, tags, description, id } =
    product;

  // Convert numeric rating (0-5) to full/half/empty stars
  const renderStars = (value) => {
    const stars = [];
    const rounded = Math.round(value * 2) / 2; // Round to nearest 0.5
    for (let i = 1; i <= 5; i++) {
      if (rounded >= i) {
        stars.push("full");
      } else if (rounded + 0.5 === i) {
        stars.push("half");
      } else {
        stars.push("empty");
      }
    }
    return stars.map((type, idx) => (
      <span key={idx} className={`star ${type}`} aria-hidden>
        {type === "full" && "★"}
        {type === "half" && "☆"}
        {type === "empty" && "☆"}
      </span>
    ));
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // ✅ prevents triggering card navigation
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="pv-card" onClick={() => navigate(`/products/${id}`)}>
      <button className="delete-btn" onClick={handleDelete}>
        <FaTrash />
      </button>
      <div className="pv-media">
        <img src={images?.[0]} alt={title} />
      </div>

      <div className="pv-body">
        <div className="pv-head">
          <h3 className="pv-title">{title}</h3>
          <div className="pv-brand">{brand}</div>
        </div>

        <div className="pv-rating">
          <div className="pv-stars" aria-label={`Rating: ${rating} out of 5`}>
            {renderStars(rating)}
          </div>
          <div className="pv-score">{rating.toFixed(1)}</div>
        </div>

        <p className="pv-desc">{description}</p>

        <div className="pv-meta">
          <div className="pv-price">${price.toFixed(2)}</div>
          <div className={`pv-stock ${stock > 0 ? "in" : "out"}`}>
            {stock > 0 ? `In stock (${stock})` : "Out of stock"}
          </div>
        </div>

        <div className="pv-tags">
          {tags?.map((t) => (
            <span key={t} className="pv-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="pv-actions">
          <button
            className="btn primary"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart({ id, title, price, image: images?.[0] }));
            }}
          >
            Add to cart
          </button>
          <button
            className="btn outline"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToWishlist({ id, title, price, image: images?.[0] }));
            }}
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
