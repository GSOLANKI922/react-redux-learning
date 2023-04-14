import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { BACKEND_URL } from "../helpers";

const stripePromise = loadStripe(
  "pk_test_51MwNDWSE4ciHZPDpCnnMbArURpvl4ShElcanL4fCzLyh2SdfQ6dVMd8BrEoEZAXdgCh2zXWAdZpU0SOX4QXfzFjL00xMv6cDJx"
);

const CheckoutForm = ({ setCheckOut }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [errorHandler, seterrorHandler] = useState("");
  const { cartTotal, items, emptyCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    pin: "",
  });

  const { error, complete } = errorHandler;

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const makePaymentRequest = async (allformData) => {
    try {
      const res = await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("token")} `,
        },
        body: JSON.stringify(allformData),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);

    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };
    // console.log(allFormData);
    // setpaymentProcess(true);
    await makePaymentRequest(allFormData);
    // setpaymentProcess(false);
    // emptyCart();
  };
  // if (paymentProcess) return <h1>Payment is Process....</h1>;

  const payChangeHandler = (e) => {
    seterrorHandler(e);
  };

  return (
    <div className="container">
      {error ? <div className="card-panel red">{error.message}</div> : ""}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Address
          </label>
          <input
            onChange={changeHandler}
            value={formData.shippingAddress}
            name="shippingAddress"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPin1" className="form-label">
            Pin
          </label>
          <input
            onChange={changeHandler}
            value={formData.pin}
            name="pin"
            type="number"
            className="form-control"
            id="exampleInputPin1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputState1" className="form-label">
            State
          </label>
          <input
            onChange={changeHandler}
            value={formData.state}
            name="state"
            type="text"
            className="form-control"
            id="exampleInputState1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCity1" className="form-label">
            City
          </label>
          <input
            onChange={changeHandler}
            value={formData.city}
            name="city"
            type="text"
            className="form-control"
            id="exampleInputCity1"
          />
        </div>
        <CardElement onChange={payChangeHandler} />
        <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
          <button
            style={{ marginTop: "1rem" }}
            type="submit"
            className="btn btn-primary"
            disabled={!stripe || !elements || (!error && !complete)}
          >
            Pay
          </button>
          <button
            type="primary"
            className="btn btn-primary"
            onClick={() => setCheckOut(false)}
            style={{ display: "inline-block" }}
          >
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
};

const Checkout = ({ setCheckOut }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm setCheckOut={setCheckOut} />
    </Elements>
  );
};
export default Checkout;
