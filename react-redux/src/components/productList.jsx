import React from "react";
import ProductCard from "./ProductCard";

const productList = ({ items }) => {
  return (
    <div className="product-list-wrraper container">
      {items?.products?.length > 0 &&
        items?.products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
    </div>
  );
};

export default productList;
