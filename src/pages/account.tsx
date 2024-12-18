import React from 'react';
import { Card, Button, Typography, Space, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PageLayout from '@/components/page-layout';

const { Title, Text, Link } = Typography;

const AccountPage = () => {
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
              src="https://via.placeholder.com/100"
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
                Win Hantari
              </Text>
              <Text>kantinbwin@gmail.com</Text>
              <Text>+6282136380355</Text>
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
