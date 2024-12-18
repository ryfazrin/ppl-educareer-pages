import React from 'react';
import { Card, Button, Typography, Row, Col, Space } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import PageLayout from '@/components/page-layout';

const { Title, Text } = Typography;

const MyCoin = () => {
  return (
    <PageLayout>
      {/* Header */}
      <Title level={3} style={{ marginBottom: 20 }}>
        Koinku <Text type="secondary" style={{ fontSize: '14px' }}>Akun Basic</Text>
      </Title>

      {/* Total Koin Section */}
      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={5}>Total Koin</Title>
            <Space>
              <DollarOutlined style={{ fontSize: '32px', color: '#FADB14' }} />
              <Title level={2} style={{ margin: 0 }}>0</Title>
            </Space>
            <Text type="secondary">Anda tidak memiliki Koin yang kadaluarsa</Text>
          </Col>
        </Row>
      </Card>

      {/* Upgrade Account Section */}
      <Card
        style={{
          backgroundColor: '#E6FCE7',
          borderColor: '#B7EB8F',
          marginTop: '20px',
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

      {/* Transaksi Koin Section */}
      <Card title="Transaksi Koin" style={{ marginTop: '20px' }}>
        <Row justify="center" align="middle" style={{ textAlign: 'center' }}>
          <Col>
            <img
              src="https://via.placeholder.com/120"
              alt="No Transaction"
              style={{ marginBottom: '10px' }}
            />
            <Text>
              Hmm... Sepertinya Anda belum memiliki transaksi Koin pada 24 bulan terakhir.
              <br />
              Tingkatkan iklan pekerjaan Anda agar lebih banyak dilihat oleh kandidat dan perekrutan lebih cepat!
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Tentang Koin Section */}
      <Card title="Tentang Koin" style={{ marginTop: '20px' }}>
        <Text>
          Koin adalah mata uang dalam platform JobStreet Express yang kami implementasikan untuk membantu meningkatkan proses perekrutan Anda. Koin yang telah dibeli dapat digunakan untuk meningkatkan performa iklan pekerjaan Anda dengan memberikan lebih banyak Prioritas & Max. 
          <br />
          Dapat digunakan dalam periode 24 bulan.
        </Text>
      </Card>
    </PageLayout>
  );
};

export default MyCoin;
