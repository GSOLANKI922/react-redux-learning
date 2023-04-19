import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphql/mutations";

const Login = () => {
  const [userLogin, { data, loading, error }] = useMutation(USER_LOGIN);

  if (loading) return <h1>Loadding...</h1>;
  if (error) return <h1>error... {error.message}</h1>;
  if (data) {
    console.log(data);
    if (data) localStorage.setItem("token", data.emailPasswordLogIn.data.token);
  }

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await userLogin({
        variables: {
          data: values,
        },
      });
    } catch (error) {
      return <h1>err..{error.message}</h1>
    }
  };
  
  return (
    <div className="loginForm_container">
      <div className="loginForm_wrapper">
        <h1 className="login_title">Login</h1>
        <Form
          name="normal_login"
          className="login-form login_form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
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
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
