import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_CATEGORIES } from "../gqloperation/queries";
import { Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

import { OrderedListOutlined } from "@ant-design/icons";

const Category = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Internal Server Err...</h1>;
  if (data) {
    var nData = data.categories.data.map(({ attributes, id }) => {
      return {
        key: id,
        label: (
          <Link to={`/category/${id}`}>
            <h5>{attributes.name}</h5>
          </Link>
        ),
      };
    });
  }

  return (
    <>
      <Dropdown
        menu={{
          items: nData,
        }}
        placement="bottomLeft"
        arrow
      >
        <Button style={{ display: "flex", textAlign: "center" }}>
          <OrderedListOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default Category;
