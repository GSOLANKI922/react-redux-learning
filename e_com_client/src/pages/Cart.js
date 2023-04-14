import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { BACKEND_URL } from "../helpers";
import { Button } from "antd";
import Checkout from "../component/Checkout";

const Cart = () => {
  const { isEmpty, items, removeItem, updateItemQuantity, cartTotal } =
    useCart();
  const [checkOut, setCheckOut] = useState(false);
  console.log(items);
  if (checkOut) {
    return (
      <div className="container" style={{ marginTop: "5rem" }}>
        <h3>Payment Page</h3>
        <Checkout setCheckOut={setCheckOut}/>
      </div>
    );
  }

  if (isEmpty) return <h2 style={{ marginTop: "5rem" }}>Cart Is Empty...</h2>;
  return (
    <div style={{ marginTop: "5rem" }}>
      <table className="table table-hover text-center container">
        <thead className="text-center">
          <tr>
            <th scope="col">Items</th>
            <th scope="col">total Item</th>
            <th scope="col"> Price Total Item</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <ul className="collection">
                    <li className="collection-item avatar">
                      <img
                        src={BACKEND_URL + item.images}
                        alt={item.name}
                        className="circle"
                      />
                      <p className="title">{item.name}</p>
                      <button
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Remove Item in Cart"
                        className="cart_button cart_button_1"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="material-icons">remove_shopping_cart</i>
                      </button>
                      <button
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="remove more Pis"
                        className="cart_button cart_button_2"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <i className="material-icons">exposure_neg_1</i>
                      </button>
                      <button
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add more Pis"
                        className="cart_button cart_button_3"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <i className="material-icons">exposure_plus_1</i>
                      </button>
                    </li>
                  </ul>
                </td>
                <td className="text-center">
                  {item.price} * {item.quantity}
                </td>
                <td className="text-center">{item.itemTotal}</td>
              </tr>
            );
          })}
          <tr>
            <th className="text-center" colSpan="2">
              Total
            </th>
            <th className="text-center">{cartTotal}</th>
          </tr>
          <tr>
            <th className="text-center" colSpan="2"></th>
            <th className="text-center">
              <Button
                disabled={!isEmpty ? false : true}
                type="primary"
                onClick={() => setCheckOut(true)}
              >
                CheckOut
              </Button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
