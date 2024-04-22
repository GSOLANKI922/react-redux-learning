"use client";
import React from "react";
import { LockOutlined, MailFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      router.push("/");
      // if (res) {
      //   router.push("/");
      // }
    } catch (error) {}
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form w-[35%]"
      initialValues={{
        remember: true,
        email: "testuser@logicwind.com",
        password: "Test123!",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your Email!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input
          prefix={<MailFilled className="site-form-item-icon" />}
          placeholder="Enter Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your 8 characters Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      Or <Link href="/signup">register now!</Link>
    </Form>
  );
};

export default LoginForm;
