import { Button, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TitleBar = ({ title, icon, link, btnName, TooLtip, display }) => {
  const router = useRouter();
  return (
    <div className="titleContainer">
      <div>
        <Tooltip title={TooLtip}>
          <Button
            className="button"
            type="text"
            icon={icon}
            size="midium"
            onClick={() => router.back()}
            style={{ display: display }}
          >
            {btnName}
          </Button>
        </Tooltip>
      </div>
      <div className="title">
        <h1 style={{ margin: "0" }}>{title}</h1>
      </div>
    </div>
  );
};

export default TitleBar;
