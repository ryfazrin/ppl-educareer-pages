import { Card, Button, List, Typography, Tag, Space, Spin, Alert } from 'antd';
import {
  FileTextOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import PageLayout from "@/components/page-layout";
import React, { useState, useEffect } from 'react';

const { Text, Title } = Typography;

const ListJob = () => {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const response = await fetch('/api/job-market'); // Fetching job market data
        if (!response.ok) {
          throw new Error('Failed to fetch job vacancies');
        }
        const data = await response.json();
        setJobVacancies(data); // Assuming the API returns an array of jobs
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobVacancies();
  }, []);

  // If data is still loading
  if (isLoading) {
    return (
      <PageLayout>
        <Spin size="large" />
      </PageLayout>
    );
  }

  // If there was an error fetching the data
  if (error) {
    return (
      <PageLayout>
        <Alert message="Error" description={error} type="error" showIcon />
      </PageLayout>
    );
  }

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
        <Title level={3}>Daftar Lowongan</Title>
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
        renderItem={(job: any) => (
          <Card style={{ marginTop: '20px' }} key={job._id}>
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<FileTextOutlined />}
                  key="reload"
                >
                  Submit
                </Button>,
              ]}>
              <Space direction="vertical" size="small">
                <Tag color={job.status === 'closed' ? 'red' : 'green'}>
                  {job.status}
                </Tag>
                <Text type="secondary">Dibuat {job.created_at}</Text>
                <Title level={5} style={{ margin: 0 }}>
                  {job.title}
                </Title>
                <Text>{job.company_details.company} - {job.location}</Text>
                <Space size="middle">
                  <ClockCircleOutlined />
                  <Text>{job.expiration_date}</Text>
                  <FileTextOutlined />
                  <Text>{job.candidates.length} Kandidat</Text>
                </Space>
              </Space>
            </List.Item>
          </Card>
        )}
      />
    </PageLayout>
  );
};

export default ListJob;
