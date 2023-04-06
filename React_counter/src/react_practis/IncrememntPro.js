import React, { useState } from "react";

const initialProducts = [
  {
    id: 0,
    name: "Baklava",
    count: 1,
  },
  {
    id: 1,
    name: "Cheese",
    count: 5,
  },
  {
    id: 2,
    name: "Spaghetti",
    count: 2,
  },
];

const IncrememntPro = () => {
  // eslint-disable-next-line
  const [products, setProducts] = useState(initialProducts);

  function handleIncreaseClick(productId) {
    const increment = products.find((elm) => elm.id === productId);
    const inc = increment.count + 1;
    console.log(inc, "inc");
    const newProduct = { ...increment, count: inc };
    console.log(newProduct, "newProduct");
    const pro = products.map((elem) =>
      elem.id === newProduct.id ? newProduct : elem
    );
    console.log(pro, "pro");
    setProducts(pro);
  }

  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>
          {product.name} (<b>{product.count}</b>)
          <button
            onClick={() => {
              handleIncreaseClick(product.id);
            }}
          >
            +
          </button>
        </li>
      ))}
    </ul>
  );
};

export default IncrememntPro;
