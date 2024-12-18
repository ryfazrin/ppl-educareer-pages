import React from 'react';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  DatePicker,
  Button,
  Typography,
  Space,
} from 'antd';
import PageLayout from '@/components/page-layout';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const JobPostingForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
  };

  return (
    <PageLayout>
      <Title level={2} className="form-title">
        Pasang Lowongan Kerja Gratis
      </Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="job-posting-form"
      >
        {/* Email */}
        <div className="form-group">
          <Text>Lamaran akan dikirim ke: </Text>
          <Text strong>kantinbwin@gmail.com</Text>
          <a href="#" style={{ marginLeft: '8px' }}>ubah</a>
        </div>

        {/* Posisi Lowongan */}
        <Form.Item
          label="Posisi Lowongan"
          name="position"
          rules={[{ required: true, message: 'Posisi lowongan wajib diisi' }]}
        >
          <Input placeholder="Cari Posisi" />
        </Form.Item>

        {/* Jenis Lowongan */}
        <Form.Item
          label="Jenis Lowongan"
          name="jobType"
          rules={[{ required: true, message: 'Pilih jenis pekerjaan' }]}
        >
          <Select placeholder="Pilih tipe pekerjaan">
            <Option value="fulltime">Full Time</Option>
            <Option value="parttime">Part Time</Option>
            <Option value="freelance">Freelance</Option>
          </Select>
        </Form.Item>

        {/* Izin Kerja */}
        <Form.Item name="workPermit" valuePropName="checked">
          <Checkbox>Warga negara asing bisa melamar</Checkbox>
        </Form.Item>

        {/* Pengalaman Kerja */}
        <Form.Item label="Pengalaman Kerja" name="experience">
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="none">Tidak diperlukan pengalaman kerja</Radio>
              <Radio value="1year">Pengalaman minimal 1 tahun</Radio>
              <Radio value="2-3years">2-3 tahun pengalaman kerja</Radio>
              <Radio value="4plus">Pengalaman 4 tahun atau lebih</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* Tanggal Mulai Kerja */}
        <Form.Item label="Tanggal Mulai Kerja" name="startDate">
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>

        {/* Gaji */}
        <Form.Item label="Gaji yang Diinginkan" name="salary">
          <Input.Group compact>
            <Select defaultValue="Sesuai">
              <Option value="Sesuai">Sesuai</Option>
            </Select>
            <Input style={{ width: '50%' }} placeholder="Rp Total" />
            <Select defaultValue="per bulan">
              <Option value="perbulan">per bulan</Option>
              <Option value="pertahun">per tahun</Option>
            </Select>
          </Input.Group>
        </Form.Item>

        {/* Deskripsi Lowongan */}
        <Form.Item
          label="Deskripsi Lowongan Kerja"
          name="description"
          rules={[{ required: true, message: 'Deskripsi pekerjaan wajib diisi' }]}
        >
          <TextArea rows={4} placeholder="Masukkan deskripsi pekerjaan..." />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Pasang Lowongan
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  );
};

export default JobPostingForm;
