"use client"
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const { Header } = Layout;

const item: MenuProps['items'] = [
  {
    key: 1,
    label:<Link href="/login">Login</Link>,
  },
  {
    key: 2,
    label:<Link href="/signin">Signin</Link>,
  }
]

const AuthHeader: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" >
          <Image src="/logo/logo.jpeg" alt='logo' height={32} width={32} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={item}
          style={{ flex: 1, minWidth: 0, justifyContent:"flex-end" }}
        />
      </Header>
    </Layout>
  );
};

export default AuthHeader;