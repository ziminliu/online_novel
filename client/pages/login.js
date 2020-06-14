import Head from 'next/head';
import Header from '../components/Header';
import { Form, Input, Button, Checkbox, Col, Row, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../public/style/pages/login.css';
import { useState } from 'react';
import axios from 'axios';
import ServicePath from '../config/apiUrl';

const Login = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const onFinish = values => {
    // console.log('Received values of form: ', values);
  };
  const handleLogin = () => {
    // console.log('submit');
    // console.log(id, password);
    axios({
      method: 'post',
      url: ServicePath.CheckLogin,
      data: { id, password },
      withCredentials: true,
    }).then(res => {
      if (res.data.data === 'success') {
        message.success('登录成功');
        // 设置session
        localStorage.setItem('userId', id);
        console.log(localStorage.getItem('userId'));
      } else {
        message.error('账号或密码错误');
      }
    });
  };

  const handleRegister = ()=> {
    console.log('注册用户');
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
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className='login-form-forgot' href=''>
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                onClick={handleLogin}
              >
                Log in
              </Button>
              Or{' '}
              <a href='javascript:void(0);' onClick={handleRegister}>
                register now!
              </a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
