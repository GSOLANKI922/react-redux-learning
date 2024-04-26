import React, { useState, useRef, HTMLAttributes } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

type SearchProps = React.ComponentProps<typeof Input> & {
  name: string;
};

const SearchComponent = ({ name, className, ...rest }: SearchProps) => {
  return (
    <Input
      className="search-component"
      allowClear
      placeholder={`Search ${name}`}
      name={name}
      suffix={<SearchOutlined />}
      {...rest}
    />
  );
};

export default SearchComponent;
