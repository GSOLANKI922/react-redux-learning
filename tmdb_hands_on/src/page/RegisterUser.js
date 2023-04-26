import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  useEffect(() => {
    setTimeout(() => {
      const auth = localStorage.getItem("token");
      if (auth) {
        navigate("/");
      }
    }, 1);
    // eslint-disable-next-line
  }, [navigate]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>error... {error.message}</h1>;
  if (data) {
    console.log(data, "createUser");
    navigate("/login");
  }

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      await createUser({
        variables: {
          data: values,
        },
      });
    } catch (error) {
      return <h1>err..{error.message}</h1>;
    }
  };

  return (
    <div className="loginForm_container">
      <div className="loginForm_wrapper" style={{ height: "85%" }}>
        <h1
          className="login_title"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          Singup
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
              Log in
            </Button>
            Or <Link to="/login">Login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterUser;
