import { Button, Input, Select, Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const TitleBar = ({
  title,
  icon,
  link,
  btnName,
  TooLtip,
  display,
  searchText,
  setSearchText,
  input,
  sorted,
  selectByCategory,
  setSelectByCategory,
}) => {
  return (
    <div className="titleContainer">
      <div>
        <Tooltip title={TooLtip}>
          <Link href={link}>
            <Button
              className="button"
              type="text"
              icon={icon}
              size="midium"
              style={{ display: display }}
            >
              {btnName}
            </Button>
          </Link>
        </Tooltip>
      </div>
      <div className="title">
        <h1 style={{ margin: "0" }}>{title}</h1>
      </div>
      <div className="inputSelectContainer">
        <Select
          placeholder="Sort By Category"
          onChange={(e) => setSelectByCategory(e)}
          defaultValue="createdAt"
          options={sorted}
          value={selectByCategory}
          style={{
            width: "40%",
            display: input,
          }}
        />
        <Input
          placeholder="Search Text"
          style={{ display: input, width: "40%" }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          allowClear
          suffix={<SearchOutlined />}
        />
      </div>
    </div>
  );
};

export default TitleBar;
