import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_PRODUCTS } from "../gqloperation/queries";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  if (loading) return <h1>Loading....</h1>;
  if (error) {
    return <h3>Internal server err...</h3>;
  }

  return (
    <div>
      <div className="homeroot">
        {data.products?.data?.map(({ id, attributes }) => {
          return (
            <>
              <Card
                id={id}
                name={attributes.name}
                price={attributes.price}
                description={attributes.description}
                imge={attributes.images.data[0].attributes.url}
              />
              
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
