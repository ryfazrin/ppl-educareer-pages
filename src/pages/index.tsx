import React from 'react';
import PageLayout from '@/components/page-layout';
import { Layout, Typography, Button, Row, Col, Card, Space } from 'antd';
import { RocketOutlined, SmileOutlined, StarOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  return (
    <PageLayout>
      {/* Content */}
      <Content style={{ padding: '50px 20px' }}>
        {/* Hero Section */}
        <div
          style={{
            background: '#f0f2f5',
            padding: '60px',
            textAlign: 'center',
            borderRadius: '8px',
            marginBottom: '40px',
          }}
        >
          <Title>Welcome to Job Career</Title>
          <Text style={{ fontSize: '16px' }}>
            Discover your next career opportunity with us.
          </Text>
          <br />
          <Button type="primary" size="large" style={{ marginTop: '20px' }}>
            Get Started
          </Button>
        </div>

        {/* Features Section */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Find Jobs"
              bordered={false}
              hoverable
              cover={<RocketOutlined style={{ fontSize: '48px', margin: '20px auto' }} />}
            >
              <Text>Search and find the best job opportunities tailored for you.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Easy Apply"
              bordered={false}
              hoverable
              cover={<SmileOutlined style={{ fontSize: '48px', margin: '20px auto' }} />}
            >
              <Text>Apply to jobs easily with one click and get connected faster.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Top Companies"
              bordered={false}
              hoverable
              cover={<StarOutlined style={{ fontSize: '48px', margin: '20px auto' }} />}
            >
              <Text>Work with the best companies to accelerate your career growth.</Text>
            </Card>
          </Col>
        </Row>
      </Content>
    </PageLayout>
  );
};

export default Home;

