"use client";
import React from "react";
import { LockOutlined, MailFilled, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "antd/es/form/Form";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutation";
// import { useAppContext } from "@/provider/contextProvider";
import { EmailPasswordLogInResponseData } from "@/.app/__generated__/graphql";
import { useRouter } from "next/navigation";

const SigninForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [createNewUser] = useMutation(CREATE_USER);

  const onFinish = async (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const { data } = await createNewUser({
        variables: {
          data: {
            ...values,
          },
        },
      });
      if (data?.emailPasswordSignUp?.message) {
        router.push("/login");
      }
    } catch (error) {}
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form w-[35%]"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your FirstName!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Enter firstName"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Enter last name"
        />
      </Form.Item>
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
          Sign in
        </Button>
      </Form.Item>
      Or <Link href="/login">login now!</Link>
    </Form>
  );
};

export default SigninForm;
