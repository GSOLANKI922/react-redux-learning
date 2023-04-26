import React from "react";
import "./Header.css";
import { Layout, Menu, theme } from "antd";
import { HEADER_ITEM_LOGIN } from "../data";
import BreadCrumb from "./BreadCrumb";
import RoutePage from "./RoutePage";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const HeaderC = () => {
  let auth = localStorage.getItem("token");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="Header_container">
            <Link to="/">
              <div className="logo">TMDB</div>
            </Link>
            <Menu
              style={{ width: "16%" }}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={auth ? HEADER_ITEM_LOGIN : ""}
            />
          </div>
        </Header>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <BreadCrumb />

          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            <RoutePage />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Design ©2023 Created by <b>@Gautam Solanki</b>
        </Footer>
      </Layout>
    </>
  );
};

export default HeaderC;
