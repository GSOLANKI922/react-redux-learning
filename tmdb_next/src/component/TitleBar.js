import { Button } from "antd";
import Link from "next/link";
import React from "react";

const TitleBar = ({ title, icon, link, btnName }) => {
  return (
    <div className="titleContainer">
      <div>
        <Link href={link}>
          <Button className="button" type="text" icon={icon} size="midium">
            {btnName}
          </Button>
        </Link>
      </div>
      <div className="title">
        <h1 style={{ margin: "0" }}>{title}</h1>
      </div>
    </div>
  );
};

export default TitleBar;
