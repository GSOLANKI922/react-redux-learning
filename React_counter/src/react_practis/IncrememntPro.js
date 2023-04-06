import React, { useState } from "react";

const initialProducts = [
  {
    id: 0,
    name: "Math Book",
    count: 1,
    stock: 10,
    price: 200,
  },
  {
    id: 1,
    name: "Since Book",
    count: 1,
    stock: 8,
    price: 500,
  },
  {
    id: 2,
    name: "English Book",
    count: 1,
    stock: 20,
    price: 400,
  },
];

const IncrememntPro = () => {
  const [products, setProducts] = useState(initialProducts);

  // Increment producs purchesh Pis start//
  function handleIncreaseClick(productId) {
    const increment = products.find((elm) => elm.id === productId);

    const inc =
      increment.count === increment.stock
        ? increment.stock
        : increment.count + 1;

    const newProduct = { ...increment, count: inc };
    const pro = products.map((elem) =>
      elem.id === newProduct.id ? newProduct : elem
    );
    setProducts(pro);
  }
  // Increment producs pis end//

  // Decrement producs pis Start//
  const handleDecreaseClick = (productId) => {
    const decrement = products.find((elm) => elm.id === productId);

    const inc = decrement.count === 1 ? 1 : decrement.count - 1;

    const newProduct = { ...decrement, count: inc };
    const pro = products.map((elem) =>
      elem.id === newProduct.id ? newProduct : elem
    );
    setProducts(pro);
  };
  // Decrement producs pis end//

  let totalPrice = 0;
  let singleProPrice;
  for (let i = 0; i < products.length; i++) {
    singleProPrice = products[i].count * products[i].price + totalPrice;
    totalPrice = singleProPrice;
  }

  return (
    <>
      <ul>
        {products?.map((product) => {
          return (
            <li key={product.id}>
              {product.name} (
              <b>
                {product.count} of {product.stock} price {""}
                {product.price * product.count}
              </b>
              ){/* //   Increment Button    // */}
              <button
                onClick={() => {
                  handleIncreaseClick(product.id);
                }}
              >
                +
              </button>
              {/* //   Decrement Button    // */}
              <button
                onClick={() => {
                  handleDecreaseClick(product.id);
                }}
              >
                -
              </button>
            </li>
          );
        })}
        {/* //   Total Price // */}
        <h2>price: {totalPrice}</h2>
      </ul>
    </>
  );
};

export default IncrememntPro;
