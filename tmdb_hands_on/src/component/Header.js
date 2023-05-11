import React from "react";
import "./Header.css";
import { Layout, Menu, theme } from "antd";
import { HEADER_ITEM_LOGIN } from "../data";
import BreadCrumb from "./BreadCrumb";
import RoutePage from "./RoutePage";
import { Link } from "react-router-dom";
import { CONSTATNTS } from "../Constants";
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
              <div className="logo">{CONSTATNTS.TMDB}</div>
            </Link>
            <Menu
              style={{ width: "19%" }}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={auth ? HEADER_ITEM_LOGIN : ""}
            />
          </div>
        </Header>
        <Content className="main_Content_container">
          {auth && <BreadCrumb />}

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
          className="footer"
          style={{
            textAlign: "center",
          }}
        >
          {CONSTATNTS.DESIGN_CREATED_BY} <b>{CONSTATNTS.GAUTAM_SOLANKI}</b>
        </Footer>
      </Layout>
    </>
  );
};

export default HeaderC;
