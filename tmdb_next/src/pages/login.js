import LayOut from "@/component/Layout";
import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Checkbox, Form, Input, Spin } from "antd";
import styles from "../styles/Login.module.css";
import { LOGIN } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [userLogin, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    let auth = localStorage.getItem("token");
    if (auth) {
      router.push("/");
    }
  }, []);

  if (error) return <h1>err...{error}</h1>;
  if (data) {
    localStorage.setItem("token", data.emailPasswordLogIn.data.token);
    router.push("/");
  }

  const onFinish = (values) => {
    try {
      userLogin({
        variables: {
          data: values,
        },
      });
    } catch (error) {
      console.log(error);
    }
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
