import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../store';
import { loginAction, updateToken } from '../../store/modules/users';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  pass: string;
}

const testUsers: User[] = [
  {
    email: 'huangrong@imooc.com',
    pass: 'huangrong',
  },
  {
    email: 'hongqigong@imooc.com',
    pass: 'hongqigong',
  },
];

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: User) => {
    dispatch(loginAction(values)).then((action) => {
      const { errcode, token } = (
        action.payload as { [index: string]: unknown }
      ).data as { [index: string]: unknown };
      if (errcode === 0 && typeof token === 'string') {
        dispatch(updateToken(token));
        message.success('登录成功');
        navigate('/');
      } else {
        message.error('登录失败');
      }
    });
  };
  const onFinishFailed = ({ values }: { values: User }) => {
    console.log('Failed:', values);
  };
  const autoLogin = (values: User) => {
    return () => {
      form.setFieldsValue(values);
      onFinish(values);
    };
  };
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
      form={form}
    >
      <Form.Item
        name="email"
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
        {testUsers.map((item) => (
          <Button
            key={item.email}
            onClick={autoLogin({ email: item.email, pass: item.pass })}
          >
            测试账号
          </Button>
        ))}
      </Form.Item>
    </Form>
  );
}
