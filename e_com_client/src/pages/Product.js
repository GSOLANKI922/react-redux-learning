import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT } from "../gqloperation/queries";
import { useQuery } from "@apollo/client";
import { BACKEND_URL } from "../helpers";
import Carousel from "@brainhubeu/react-carousel";
import { useCart } from "react-use-cart";

const Product = () => {
  const { addItem } = useCart();
  const { pid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });

  if (loading) return <h1>Loading....</h1>;
  if (error) {
    return <h3>Internal server err...</h3>;
  }
  const { name, price, description, images } = data.product.data.attributes;

  const addtoCart = () => {
    addItem({
      id: pid,
      price,
      name,
      images: images.data[0].attributes.url,
      description,
    });
  };
  return (
    <div className="container" style={{ marginTop: "5rem" }}>
     
      <div className="card-image product_image_container">
      <button
          className="waves-effect waves-light btn-large"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <Carousel plugins={["arrows"]}>
          {images.data.map(({ attributes }) => {
            return (
              <img
                key={data.product.data.id}
                className="product_image"
                src={`${BACKEND_URL + attributes.url}`}
                alt={attributes.url}
              />
            );
          })}
        </Carousel>
      </div>
      <div
        className="card-content"
        style={{
          backgroundColor: "#a9a9af8c",
          marginTop: "0.5rem",
          padding: "2rem",
        }}
      >
        <h3 className="card-title">{name}</h3>
        <h5 className="green-text">₹ {price}</h5>
        <p>{description}</p>
        <button
          className="waves-effect waves-light btn-large"
          onClick={addtoCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
