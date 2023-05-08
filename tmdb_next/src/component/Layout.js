import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;
import styles from "../styles/Layout.module.css";
import Link from "next/link";

const LayOut = ({ children, backgroundColor, infiniteScroll }) => {
  const items = [
    {
      key: 1,
      label: <Link href="/">Home</Link>,
    },
    {
      key: 2,
      label: <Link href="/movielist">MovieList</Link>,
    },
    {
      key: 3,
      label: <Link href="/personlist">PersonList</Link>,
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className={styles.logo}>TMDB</div>
        <Menu theme="dark" mode="horizontal" items={items} />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          onScroll={infiniteScroll}
          className={styles.site_layout_content}
          style={(backgroundColor = { backgroundColor })}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Design ©2023 Created by <b>@GautamSolanki</b>
      </Footer>
    </Layout>
  );
};

export default LayOut;
