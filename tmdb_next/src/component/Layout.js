import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;
import styles from "../styles/Layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Auth from "./Auth";

const LayOut = ({
  children,
  backgroundColor,
  infiniteScroll,
  breadCrumb,
  display,
}) => {
  const router = useRouter();
  const [auth, setAuth] = useState("");

  const getToken = async () => {
    await setAuth(localStorage.getItem("token"));
  };

  useEffect(() => {
    getToken();
  }, [auth]);

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
      label: <Link href="/favoritemovies">FavoriteMovies</Link>,
    },
    {
      key: 4,
      label: <Link href="/personlist">PersonList</Link>,
    },
    {
      key: 5,
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </span>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Auth />
      <Header>
        {auth ? (
          <Link href={"/"}>
            <div className={styles.logo}>TMDB</div>
          </Link>
        ) : (
          <div className={styles.logo}>TMDB</div>
        )}
        {auth && <Menu theme="dark" mode="horizontal" items={items} />}
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div style={{ visibility: display }}>{breadCrumb}</div>
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