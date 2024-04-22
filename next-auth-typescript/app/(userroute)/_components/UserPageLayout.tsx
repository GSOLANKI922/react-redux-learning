"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const { Header, Content, Footer } = Layout;

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const items = [
    {
      key: 1,
      label: <Link href="/">Deshboard</Link>,
    },
    {
      key: 2,
      label: <Link href="/movie-list">Movie List</Link>,
    },
    {
      key: 3,
      label: <Link href="/person-list">Persons List</Link>,
    },
    {
      key: 4,
      label: (
        <span
          onClick={() => {
            signOut();
            router.push("/login");
          }}
        >
          Logout
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div
          className="demo-logo text-[#ffffff] font-bold text-2xl mr-5 cursor-pointer"
          onClick={() => router.push("/")}
        >
          TMDB
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
          className="main-contain-container"
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default UserPageLayout;
