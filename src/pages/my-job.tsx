import React from 'react';
import { Card, Button, List, Typography, Tag, Space } from 'antd';
import {
  FileTextOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import PageLayout from '@/components/page-layout';

const { Text, Title } = Typography;

const MyJob = () => {
  // Dummy data for job vacancies
  const jobVacancies = [
    {
      id: 1,
      status: 'Ditutup',
      createdDate: '12 Sep 2024',
      title: 'Koki & Asisten Koki',
      candidates: 9,
      expireInfo: 'Informasi kandidat akan kadaluarsa pada 18 Nov 2024',
    },
    {
      id: 2,
      status: 'Ditutup',
      createdDate: '12 Sep 2024',
      title: 'Waiters/Waitresses',
      candidates: 21,
      expireInfo: 'Informasi kandidat akan kadaluarsa pada 18 Nov 2024',
    },
    {
      id: 3,
      status: 'Kadaluarsa',
      createdDate: '9 Nov 2023',
      title: 'Cook Helper',
      candidates: 10,
      expireInfo: 'Lowongan ini kadaluarsa pada tanggal 8 Des 2023',
    },
    {
      id: 4,
      status: 'Ditutup',
      createdDate: '19 Okt 2023',
      title: 'Waiter Dan Delivery',
      candidates: 0,
      expireInfo: 'Informasi kandidat akan kadaluarsa pada 14 Okt 2024',
    },
  ];

  return (
    <PageLayout>
      {/* Header */}
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Title level={3}>Lowongan Saya</Title>
        <Button type="primary">Pasang Lowongan</Button>
      </Space>

      {/* Upgrade Account Banner */}
      <Card
        style={{ backgroundColor: '#E6F7FF', borderColor: '#1890FF' }}
        bordered={false}
      >
        <Space direction="vertical">
          <Text strong>
            Percepat proses perekrutan Anda hari ini! Posting lebih banyak
            pekerjaan, kelola beberapa bisnis, dan dapatkan diskon koin.
          </Text>
          <Button type="primary" style={{ width: 150 }}>
            Upgrade akun
          </Button>
        </Space>
      </Card>

      {/* Job Vacancy List */}
      <List
        dataSource={jobVacancies}
        renderItem={(job) => (
          <Card style={{ marginTop: '20px' }}>
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<ReloadOutlined />}
                  key="reload"
                >
                  Tampilkan kembali
                </Button>,
              ]}
            >
              <Space direction="vertical" size="small">
                <Tag color={job.status === 'Kadaluarsa' ? 'red' : 'default'}>
                  {job.status}
                </Tag>
                <Text type="secondary">Dibuat {job.createdDate}</Text>
                <Title level={5} style={{ margin: 0 }}>
                  {job.title}
                </Title>
                <Text>KANTIN BWIN - Kentingan, Jawa Tengah</Text>
                <Space size="middle">
                  <ClockCircleOutlined />
                  <Text>{job.expireInfo}</Text>
                  <FileTextOutlined />
                  <Text>{job.candidates} Kandidat</Text>
                </Space>
              </Space>
            </List.Item>
          </Card>
        )}
      />
    </PageLayout>
  );
};

export default MyJob;
