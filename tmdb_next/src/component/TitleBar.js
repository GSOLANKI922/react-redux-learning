import { Button, Input, Select, Tooltip } from "antd";
import Link from "next/link";
import React from "react";

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
            width: "20rem",
            display: input,
          }}
        />
        <Input
          placeholder="Search Text"
          style={{ display: input }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>
    </div>
  );
};

export default TitleBar;
