import { Button, Tooltip } from "antd";
import Link from "next/link";
import React from "react";

const TitleBar = ({ title, icon, link, btnName, TooLtip }) => {
  return (
    <div className="titleContainer">
      <div>
        <Link href={link}>
          <Tooltip title={TooLtip}>
            <Button className="button" type="text" icon={icon} size="midium">
              {btnName}
            </Button>
          </Tooltip>
        </Link>
      </div>
      <div className="title">
        <h1 style={{ margin: "0" }}>{title}</h1>
      </div>
    </div>
  );
};

export default TitleBar;
