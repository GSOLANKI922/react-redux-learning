import React, { useEffect } from "react";
import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphql/mutations";
import { Link, useNavigate } from "react-router-dom";
import { CONSTATNTS } from "../Constants";
import NotificationC from "../component/NotificationC";

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, { data, loading, error }] = useMutation(USER_LOGIN);
  useEffect(() => {
    setTimeout(() => {
      let auth = localStorage.getItem("token");

      if (auth) {
        navigate("/");
      }
    }, 1);
    // eslint-disable-next-line
  }, [data]);

  if (error) {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

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
      {error && <NotificationC message={error.message} text="error" />}
      <div className="loginForm_wrapper">
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
          {loading && (
            <h1>
              <LoadingOutlined />
            </h1>
          )}
        </Form>
      </div>
    </div>
  );
};
export default Login;
