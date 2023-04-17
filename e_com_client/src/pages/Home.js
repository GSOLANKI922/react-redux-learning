import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCTS } from "../gqloperation/queries";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Pagination } from "antd";
import { useLazyQuery } from "@apollo/client";
import LoadingCard from "../component/LoadingCard";
import Search from "../component/Search";

const Home = () => {
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState(1);
  const { addItem } = useCart();
  const addtoCart = ({ id, name, price, description, imge }) => {
    addItem({
      id,
      price,
      name,
      images: imge,
      description,
    });
  };

  const [getPageData, { loading, data, error }] = useLazyQuery(
    GET_ALL_PRODUCTS,
    {
      variables: {
        pagination: {
          page: curPage,
          pageSize: 10,
        },
      },
    }
  );

  useEffect(() => {
    getPageData();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) return <LoadingCard />;

  if (error) {
    return <h3>Internal server err...</h3>;
  }

  const changeHandler = (page) => {
    setCurPage(page);
    getPageData();
  };

  return (
    <div>
      <div className="home_container">
        <Search />
        <div className="homeroot">
          {data ? (
            data.products?.data?.map(({ id, attributes }) => {
              return (
                <>
                  <Card
                    id={id}
                    name={attributes.name}
                    price={attributes.price}
                    description={attributes.description}
                    imge={attributes.images.data[0].attributes.url}
                    cartAdded={addtoCart}
                  />
                </>
              );
            })
          ) : (
            <LoadingCard />
          )}
        </div>
      </div>
      <Pagination
        style={{ position: "relative", zIndex: "99", top: "85rem" }}
        defaultCurrent={1}
        total={data ? data.products?.meta?.pagination?.total : 50}
        onChange={changeHandler}
      />
    </div>
  );
};

export default Home;
