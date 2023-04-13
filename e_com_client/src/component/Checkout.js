import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const CheckoutForm = () => {
  const { cartTotal, items } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    pin: "",
  });

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(CardElement);

    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };
    console.log(allFormData);
  };

  console.log(formData, "formData");
  return (
    <div style={{ marginTop: "100rem" }} className="container">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Address
          </label>
          <input
            onChange={changeHandler}
            value={formData.shippingAddress}
            name="shippingAddress"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPin1" class="form-label">
            Pin
          </label>
          <input
            onChange={changeHandler}
            value={formData.pin}
            name="pin"
            type="number"
            class="form-control"
            id="exampleInputPin1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputState1" class="form-label">
            State
          </label>
          <input
            onChange={changeHandler}
            value={formData.state}
            name="state"
            type="text"
            class="form-control"
            id="exampleInputState1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputCity1" class="form-label">
            City
          </label>
          <input
            onChange={changeHandler}
            value={formData.city}
            name="city"
            type="text"
            class="form-control"
            id="exampleInputCity1"
          />
        </div>
        <CardElement />
        <button
          type="submit"
          class="btn btn-primary"
          disabled={!stripe || !elements}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>;
};
export default Checkout;
