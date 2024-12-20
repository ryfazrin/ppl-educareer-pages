import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Space, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PageLayout from '@/components/page-layout';
import { useUser } from '@auth0/nextjs-auth0/client';

const { Title, Text, Link } = Typography;

const AccountPage = () => {
  const defaultPicture =
    "https://cdn.auth0.com/blog/hello-auth0/auth0-user.png";

  const { user, error, isLoading } = useUser();

  const [mongoUser, setMongoUser] = useState();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    // Cek jika user sudah ada dan sudah selesai loading
    if (user) {
      // Kirim nickname pengguna ke API /users untuk memeriksa apakah terdaftar
      const checkUserRegistration = async () => {
        try {
          const response = await fetch(`/api/users?nickname=${user.nickname}`); // Ganti email dengan nickname
          if (response.ok) {
            const data = await response.json();
            setIsUserRegistered(data.found); // Asumsi API mengembalikan { found: true/false }
            setMongoUser(data.user);
          } else {
            console.error("Failed to check user registration");
            setIsUserRegistered(false); // Pengguna tidak terdaftar
          }
        } catch (error) {
          console.error("Error checking registration:", error);
          setIsUserRegistered(false); // Set status gagal jika terjadi error
        }
      };

      checkUserRegistration();
    }
  }, [user]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (!mongoUser) return null;

  return (
    <PageLayout>
      {/* Header */}
      <Title level={3}>
        Akun{' '}
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Akun Basic
        </Text>
      </Title>

      {/* Upgrade Account Banner */}
      <Card
        style={{
          backgroundColor: '#E6FCE7',
          borderColor: '#B7EB8F',
          marginBottom: '20px',
        }}
        bordered={false}
      >
        {isUserRegistered === null ? (
          <p>Checking registration...</p>
        ) : isUserRegistered ? (
          <p>Your account is registered in the system!</p>
        ) : (
          <p>Your account is not registered. Please sign up.</p>
        )}
        
        <Row justify="space-between" align="middle">
          <Col span={16}>
            <Space direction="vertical">
              <Text strong style={{ fontSize: 16 }}>
                Percepat proses perekrutan Anda hari ini!
              </Text>
              <Text style={{ fontSize: 14 }}>
                Posting lebih banyak pekerjaan, kelola beberapa bisnis, dan
                dapatkan diskon koin. Bersiaplah dengan fitur-fitur baru menarik
                yang akan segera hadir!
              </Text>
              <Button type="primary">Upgrade akun</Button>
            </Space>
          </Col>
          <Col>
            <img
              src={user.picture || defaultPicture}
              alt="Upgrade"
              style={{ width: '100px' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Account Info Section */}
      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical" size="small">
              <Text strong style={{ fontSize: 16 }}>
                {mongoUser.name}
              </Text>
              <Text>{mongoUser.nickname}</Text>
              <Text>{mongoUser.role}</Text>
              {/* <Text>+6282136380355</Text> */}
            </Space>
          </Col>
          <Col>
            <Button type="link" icon={<EditOutlined />}>
              Edit
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Account Actions */}
      <Card style={{ marginTop: 20 }}>
        <Space direction="vertical">
          <Link href="#" style={{ color: '#1890ff' }}>
            Ubah kata sandi
          </Link>
          <Link href="#" style={{ color: '#1890ff' }}>
            Hapus akun
          </Link>
          <Link href="#" style={{ color: '#1890ff' }}>
            Keluar
          </Link>
        </Space>
      </Card>

      {/* Return to Home */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Link href="#" style={{ color: '#1890ff' }}>
          Kembali ke beranda
        </Link>
      </div>
    </PageLayout>
  );
};

export default AccountPage;
