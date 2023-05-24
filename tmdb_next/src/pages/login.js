import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Spin } from "antd";
import styles from "../styles/Login.module.css";
import { LOGIN } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import LayOut from "@/component/Layout";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({});
  const [userLogin, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      data: loginData ? loginData : null,
    },
    onCompleted: (res) => {
      localStorage.setItem("token", res.emailPasswordLogIn.data.token);
      router.push("/");
    },
  });

  useEffect(() => {
    let auth = localStorage.getItem("token");
    if (auth) {
      router.push("/");
    }
  }, []);

  const onFinish = async (values) => {
    await setLoginData(values);
    userLogin();
  };

  return (
    <LayOut
      backgroundColor="#080710"
      breadCrumb={
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item></Breadcrumb.Item>
          <Breadcrumb.Item> Create</Breadcrumb.Item>
        </Breadcrumb>
      }
      display="hidden"
    >
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>

      {!loading ? (
        <Form
          name="normal_login"
          className={styles.form}
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h3 style={{ color: "white" }}>User LogIn </h3>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              className={styles.input}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter User Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
                min: 6,
              },
            ]}
          >
            <Input
              className={styles.input}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      ) : (
        <Spin size="large" />
      )}
    </LayOut>
  );
};

export default Login;
