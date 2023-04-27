import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { CONSTATNTS } from "../Constants";

const ErrorPage = () => {
  return (
    <div className="error_container">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to="/">
            <Button type="primary">{CONSTATNTS.BACK_TO_HOME}</Button>
          </Link>
        }
      />
    </div>
  );
};

export default ErrorPage;
