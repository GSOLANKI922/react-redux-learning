import React from "react";
import "./Header.css"
import { Layout, Menu, theme } from "antd";
import { BREADCRUMB_HOME_ITEM, HEADER_ITEM } from "../data";
import BreadCrumb from "./BreadCrumb";
import RoutePage from "./RoutePage";
const { Header, Content, Footer } = Layout;

const HeaderC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={HEADER_ITEM}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <BreadCrumb items={BREADCRUMB_HOME_ITEM} />

        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <RoutePage/>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HeaderC;
