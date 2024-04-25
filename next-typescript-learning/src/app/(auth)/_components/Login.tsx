"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Space } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MODULES, ROUTES } from "@/constants";

interface LoginFormData {
  email: string;
  password: string;
}
const LoginForm = () => {
  const router = useRouter();
  const onFinish = async (values: LoginFormData) => {
    console.log("Received values of form: ", values);
    const res = await signIn("credentials", {
      redirect: false,
      ...values,
    });
    if (res?.status === 200) {
      router.push(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="form-container">
      <div className="login-title">{MODULES.LOGIN} User</div>
      <div className="login-head">Welcome To TMDB</div>
      <Form
        onFinish={onFinish}
        autoComplete="off"
        className="form"
        layout="vertical"
        initialValues={{
          email: "testuser@logicwind.com",
          password: "Test123!",
        }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter valid email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter Email!"
            id="input"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <div className="forgot-password">Forgot password?</div>
        <Button htmlType="submit" className="login-form-button" key="submit">
          Log In
        </Button>
        <div className="goto-signin">Don&apos;t have an account?</div>
      </Form>
    </div>
  );
};

export default LoginForm;
