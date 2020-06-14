import Head from 'next/head';
import Header from '../components/Header';
import { Form, Input, Button, Checkbox, Col, Row, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../public/style/pages/login.css';
import { useState } from 'react';
import axios from 'axios';
import ServicePath from '../config/apiUrl';

const Register = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const onFinish = values => {
    // console.log('Received values of form: ', values);
  };

  const handleRegister = () => {
    console.log('注册用户');
    axios({
      method: 'post',
      url: ServicePath.AddUser,
      withCredentials: true,
      data: {
        id,
        name,
        password,
      },
    }).then(res => {
      if (res.data.data === 'error') {
        message.error('id 已被使用');
      } else {
        message.success('注册成功');
      }
    });
  };

  return (
    <>
      <Head>
        <title>登录在线小说阅读</title>
      </Head>
      <Header />
      <Row>
        <Col span={6} offset={9}>
          <Form
            name={form}
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='name'
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name='id'
              rules={[{ required: true, message: 'Please input your id!' }]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='id'
                onChange={e => {
                  setId(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                onClick={handleRegister}
              >
                register now!
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
