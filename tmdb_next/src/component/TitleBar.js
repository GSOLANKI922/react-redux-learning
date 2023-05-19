import { Button, Input, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
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
}) => {
  const router = useRouter();
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
      <Input
        placeholder="Search Text"
        style={{ width: "25%", display: input }}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
    </div>
  );
};

export default TitleBar;
