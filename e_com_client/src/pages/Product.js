import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../gqloperation/queries";
import { useQuery } from "@apollo/client";
import { BACKEND_URL } from "../helpers";
import Carousel from "@brainhubeu/react-carousel";

const Product = () => {
  const { pid } = useParams();
  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });
  if (loading) return <h1>Loading....</h1>;
  if (error) {
    return <h3>Internal server err...</h3>;
  }
  if (data) {
    console.log(data.product, "data");
  }

  const { name, price, description, images } = data.product.data.attributes;

  // let Images = [];
  // for (let i = 0; i < images.data.length; i++) {
  //   Images.push(images.data[i]?.attributes?.url);
  // }

  return (
    <div className="container" style={{marginTop:"5rem"}}>
      <div className="card-image product_image_container">
        <Carousel plugins={["arrows"]}>
          {images.data.map(({attributes}) => {
            return <img className="product_image" src={`${BACKEND_URL + attributes.url}`} alt={attributes.url} />;
          })}
        </Carousel>
      </div>
      <div className="card-content" style={{backgroundColor:"#a9a9af8c", marginTop:"0.5rem", padding:"2rem"}}>
        <h3 className="card-title">{name}</h3>
        <h5 className="green-text">₹ {price}</h5>
        <p >{description}</p>
        <button className="waves-effect waves-light btn-large">Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
