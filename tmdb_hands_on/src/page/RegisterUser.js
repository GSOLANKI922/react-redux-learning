import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { CONSTATNTS } from "../Constants";
import NotificationC from "../component/NotificationC";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  useEffect(() => {
    setTimeout(() => {
      let auth = localStorage.getItem("token");
      if (auth) {
        navigate("/");
      }
    }, 1);
    // eslint-disable-next-line
  }, [navigate]);

  if (data) {
    console.log(data);
    setTimeout(() => {
      navigate("/login");
    });
  }

  const onFinish = async (values) => {
    try {
      await createUser({
        variables: {
          data: values,
        },
      });
    } catch (error) {
      return <h1>{error.message}</h1>;
    }
  };

  return (
    <div className="loginForm_container">
      {data && (
        <NotificationC
          message={data.emailPasswordSignUp.message}
          text="success"
        />
      )}
      <div className="loginForm_wrapper" style={{ height: "85%" }}>
        {error && <h1>{error.message}</h1>}
        {loading && <LoadingOutlined />}
        <h1
          className="login_title"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          {CONSTATNTS.SINGUP}
        </h1>
        <Form
          name="normal_login"
          className="login-form login_form"
          style={{ marginTop: "2rem" }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your FirstName!",
                type: "text",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="firstName"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your LastName!",
                type: "name",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="LastName"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="password"
            />
          </Form.Item>

          <Form.Item className="login_button">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              {CONSTATNTS.SINGUP}
            </Button>
            {CONSTATNTS.OR} <Link to="/login">{CONSTATNTS.LOGIN_NOW}</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterUser;
