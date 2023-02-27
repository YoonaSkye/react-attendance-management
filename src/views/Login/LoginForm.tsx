import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function LoginForm() {
  const onFinish = () => {};
  const onFinishFailed = () => {};
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入邮箱!' },
          {
            type: 'email',
            message: '请输入正确格式邮箱',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="邮箱" />
      </Form.Item>

      <Form.Item
        name="pass"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 20 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        <Button htmlType="submit">测试账号1</Button>
        <Button htmlType="submit">测试账号2</Button>
      </Form.Item>
    </Form>
  );
}
