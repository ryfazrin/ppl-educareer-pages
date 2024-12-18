import { Layout, Menu, theme } from "antd";
import React from "react";
import type { MenuProps } from 'antd';
import Link from "next/link";

const { Content, Footer, Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'home',
    label: <Link href="/">Home</Link>,
  },
  {
    key: 'my-job',
    label: <Link href="/my-job">Lowongan Saya</Link>,
  },
  {
    key: 'job',
    label: <Link href="/job-posting">Job Post</Link>,
  },
  {
    key: 'company-info',
    label: <Link href="/company-info">Info Perusahaan</Link>,
  },
  {
    key: 'my-coin',
    label: <Link href="/my-coin">Koin Saya</Link>,
  },
  {
    key: 'account',
    label: <Link href="/account">Akun</Link>,
  },
];

const PageLayout = ({ children }: any) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Job Career ©{new Date().getFullYear()} Created by UGM
      </Footer>
    </Layout>
  );
}

export default PageLayout;