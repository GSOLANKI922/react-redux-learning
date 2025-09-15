import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart,
} from "../app/slice/cartSlice";
import "./CartPage.css";
import { useNavigate } from "react-router";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty 🛒</h2>
        <button className="btn primary" onClick={() => navigate("/")}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} className="cart-img" />

            <div className="cart-info">
              <h3 className="cart-name">{item.title}</h3>
              <p className="cart-price">${item.price.toFixed(2)}</p>

              <div className="cart-quantity">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="qty-btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-actions">
              <p className="cart-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Total Items: {cartItems.length}</p>
        <p className="summary-price">Total: ${totalPrice.toFixed(2)}</p>
        <button className="btn primary">Proceed to Checkout</button>
        <button className="btn outline" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
