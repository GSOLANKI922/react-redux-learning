"use client";
import React, { useState } from "react";
import {
  DashboardOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { MODULES, ROUTES } from "@/constants";
import Link from "next/link";

const { Header, Content, Sider } = Layout;

const routes = [
  {
    key: 1,
    label: <Link href={ROUTES.MAIN}>{MODULES.DASHBOARD}</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: 2,
    label: <Link href={ROUTES.MOVIE}>{MODULES.MOVIE}</Link>,
    icon: <VideoCameraOutlined />,
  },
  {
    key: 3,
    label: <Link href={ROUTES.USER}>{MODULES.USER}</Link>,
    icon: <UserOutlined />,
  },
];

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout-wrapper">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="app-logo">TMDB</div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={routes}
          />
          <Button
            type="text"
            icon={!collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              position: "absolute",
              bottom: "0",
            }}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
