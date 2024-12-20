import { Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from 'antd';
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { PageLoader } from "./page-loader";
import { useRouter } from "next/router";
import { checkUserRegistration } from "@/helpers/checkUserRegistration";

const { Content, Footer, Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const itemsCompany: MenuItem[] = [
  {
    key: '/',
    label: <Link href="/">Home</Link>,
  },
  {
    key: '/my-job',
    label: <Link href="/my-job">Lowongan Saya</Link>,
  },
  {
    key: '/job-posting',
    label: <Link href="/job-posting">Tambah Lowongan</Link>,
  },
  {
    key: '/company-info',
    label: <Link href="/company-info">Info Perusahaan</Link>,
  },
  {
    key: '/my-coin',
    label: <Link href="/my-coin">Koin Saya</Link>,
  },
  {
    key: '/account',
    label: <Link href="/account">Akun</Link>,
  },
  {
    key: 'logout',
    label: <Link href="/api/auth/logout">Log Out</Link>,
  },
];

const itemsStudent: MenuItem[] = [
  {
    key: '/',
    label: <Link href="/">Home</Link>,
  },
  {
    key: '/student/list-job',
    label: <Link href="/student/list-job">List Lowongan</Link>,
  },
  {
    key: '/student/history',
    label: <Link href="/student/history">Histori Lamaran</Link>,
  },
  {
    key: '/account',
    label: <Link href="/account">Akun</Link>,
  },
  {
    key: 'logout',
    label: <Link href="/api/auth/logout">Log Out</Link>,
  },
];

const itemsRight: MenuItem[] = [
  {
    key: 'login',
    label: <Link href="/api/auth/login">Log In</Link>,
  },
  {
    key: 'signup',
    label: <Link href="/api/auth/signup">Sign Up</Link>,
  },
];

const PageLayout = ({ children }: any) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  // Menentukan selectedKey berdasarkan route
  const selectedKey = itemsCompany.find((item: any) => item.key === router.pathname)?.key || '/';

  const { isLoading, user } = useUser();

  const [mongoUser, setMongoUser] = useState<any>();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    // Cek jika user sudah ada dan sudah selesai loading
    if (user) {
      const checkRegistration = async () => {
        const result = await checkUserRegistration(user.nickname); // Memanggil helper

        setIsUserRegistered(result.found);
        setMongoUser(result.user);
      };

      checkRegistration();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', background: '#fff' }}>
        <div className="logo">
          <span className="logo-text">Job</span>
          <span className="logo-highlight">Career</span>
        </div>

        {mongoUser && (
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[
              (mongoUser.role == "company" ? itemsCompany : itemsStudent)
              .find((item: any) => item.key === router.pathname)?.key || '/' as any
            ]}
            items={mongoUser.role == "company" ? itemsCompany : itemsStudent}
            style={{ flex: 1, minWidth: 0 }}
          />
        )}
        {!user && (
          <Menu
            theme="light"
            mode="horizontal"
            items={itemsRight}
            style={{ flex: 1, minWidth: 0 }}
          />
        )}
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
            marginBlockStart: 12
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