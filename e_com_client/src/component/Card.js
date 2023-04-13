import React from "react";
import { BACKEND_URL } from "../helpers";
import { Link } from "react-router-dom";

const Card = ({ id, name, price, description, imge }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="card p_card section black-text">
        <div className="card-image">
          <img src={`${BACKEND_URL + imge}`} alt={name} className="cImage" />
        </div>
        <div className="card-content" style={{backgroundColor:"#a9a9af8c", marginTop:"0.5rem"}}>
          <span className="card-title truncate">{name}</span>
          <p className="truncate">{description}</p>
          <h6 className="green-text">₹ {price}</h6>
          <button className="waves-effect waves-light btn-large aline-center">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
