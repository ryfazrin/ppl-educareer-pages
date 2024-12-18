import React from 'react';
import { Card, Button, Space, Typography, Row, Col, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import PageLayout from '@/components/page-layout';

const { Title, Text } = Typography;

const CompanyInfo = () => {
  return (
    <PageLayout>
      {/* Header */}
      <Row justify="space-between" align="middle">
        <Title level={3} style={{ margin: 0 }}>
          Info Perusahaan
        </Title>
        <Button type="default" disabled icon={<PlusOutlined />}>
          Tambahkan Perusahaan
        </Button>
      </Row>
      <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
        Batas bisnis tercapai
      </Text>

      {/* Company Card */}
      <Card style={{ marginTop: '20px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical">
              <Title level={5} style={{ margin: 0 }}>
                KANTIN BWIN
              </Title>
              <Text>Kentingan, Jawa Tengah</Text>
            </Space>
          </Col>
          <Col>
            <Space size="large">
              <Button type="link" icon={<EditOutlined />}>
                Edit
              </Button>
              <Button type="link" danger icon={<DeleteOutlined />}>
                Hapus
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Upgrade Account Banner */}
      <Card
        style={{
          backgroundColor: '#E6FCE7',
          border: '1px solid #B7EB8F',
          marginTop: '20px',
        }}
        bordered={false}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical">
              <Text strong style={{ fontSize: 16 }}>
                Percepat proses perekrutan Anda hari ini!
              </Text>
              <Text style={{ fontSize: 14 }}>
                Posting lebih banyak pekerjaan, kelola beberapa bisnis, dan dapatkan diskon koin. Bersiaplah dengan fitur-fitur baru menarik yang akan segera hadir!
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
    </PageLayout>
  );
};

export default CompanyInfo;
