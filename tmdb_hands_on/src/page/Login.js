import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";
import NotificationC from "../component/NotificationC";
import { CONSTATNTS } from "../Constants";

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, { data, loading, error }] = useMutation(USER_LOGIN);
  let auth;
  useEffect(() => {
    setTimeout(() => {
      auth = localStorage.getItem("token");

      if (auth) {
        navigate("/");
      }
    }, 1);
    // eslint-disable-next-line
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>error... {error.message}</h1>;
  if (data) {
    localStorage.setItem("token", data.emailPasswordLogIn.data.token);
    navigate("/");
    if (data.emailPasswordLogIn.data.token || false) {
      window.location.reload();
    }
  }

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      await userLogin({
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
      <div className="loginForm_wrapper">
        {error ? <h1>{error.message}</h1> : ""}
        <h1 className="login_title">{CONSTATNTS.LOGIN}</h1>
        <Form
          loading={loading}
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
              {CONSTATNTS.LOGIN}
            </Button>
            {CONSTATNTS.OR} <Link to="/SingUp">{CONSTATNTS.REGISTER_NOW}</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
