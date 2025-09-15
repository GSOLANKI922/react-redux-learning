import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useNavigate } from "react-router";

const ProductDetails = ({ product = {} }) => {
  console.log(product, "por");
  const [mainImage, setMainImage] = useState("");
  const navigate = useNavigate();
  const {
    title = "",
    brand = "",
    description = "",
    price = "",
    rating = "",
    stock = "",
    images = "",
  } = product;

  // render stars
  const renderStars = (value) => {
    const stars = [];
    const rounded = Math.round(value * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (rounded >= i) {
        stars.push("★");
      } else if (rounded + 0.5 === i) {
        stars.push("☆");
      } else {
        stars.push("☆");
      }
    }
    return stars.join(" ");
  };

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]); // default to first image
    }
  }, [product]);

  return (
    <div className="details-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="details-wrapper">
        {/* Product Images */}
        <div className="details-media">
          <img
            src={mainImage ?? images?.[0]}
            alt={title}
            className="main-image"
          />
          <div className="thumbs">
            {images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title}-${i}`}
                className={img === mainImage ? "active" : ""}
                onClick={() => setMainImage(img)} // ✅ updates main image
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="details-body">
          <h2 className="details-title">{title}</h2>
          <div className="details-brand">{brand}</div>

          <div className="details-rating">
            <span className="stars">{renderStars(rating)}</span>
            <span className="score">({rating.toFixed(1)})</span>
          </div>

          <p className="details-desc">{description}</p>

          <div className="details-meta">
            <div className="details-price">${price.toFixed(2)}</div>
            <div className={`details-stock ${stock > 0 ? "in" : "out"}`}>
              {stock > 0 ? `In stock (${stock})` : "Out of stock"}
            </div>
          </div>

          {/* Actions */}
          <div className="details-actions">
            <button className="btn primary">🛒 Add to Cart</button>
            <button className="btn outline">❤️ Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
