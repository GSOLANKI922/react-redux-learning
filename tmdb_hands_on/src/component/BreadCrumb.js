import React from "react";
import { Breadcrumb } from "antd";

const BreadCrumb = ({items}) => {
  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
      items={items}
    />
  );
};

export default BreadCrumb;
