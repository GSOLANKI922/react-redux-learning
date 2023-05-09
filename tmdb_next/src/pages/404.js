import LayOut from "@/component/Layout";
import { Button, Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  }, []);
  return (
    <LayOut>
      <div className="error_container">
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Link href={"/"}>
              <Button type="primary">BACK TO HOME</Button>
            </Link>
          }
        />
      </div>
    </LayOut>
  );
};

export default ErrorPage;
