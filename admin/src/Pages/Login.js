/*
 * @Author: 刘子民
 * @Date: 2020-06-08 22:55:45
 * @LastEditTime: 2020-06-08 23:54:53
 */

import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../static/css/Login.css';
import ServicePath from '../config/apiUrl';
import axios from 'axios';

function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const checkLogin = () => {
    setIsLoading(true);
    if (!userName) {
      message.error('用户名不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    } else if (!password) {
      message.error('密码不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    }
    let dataProps = {
      userName: userName,
      password: password,
    };
    axios({
      method: 'post',
      url: ServicePath.CheckLogin,
      data: dataProps,
      withCredentials: true,
    }).then(res => {
      setIsLoading(false);
      console.log(res);
      if (res.data.status === 'success') {
        localStorage.setItem('openId', res.data.openId);
        props.history.push('/index');
      } else {
        message.error('用户名密码错误');
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const showModel = () => {
    setIsVisible(true);
    console.log(isVisible);
  };
  const handleOk = () => {
    console.log('ok');
  };
  const handleCancel = () => {
    console.log('calcle');
  };
  return (
    <div className='login-div'>
      <Spin tip='Loading...' spinning={isLoading}>
        <Card title='在线小说连载网站' bordered={true} style={{ width: 400 }}>
          <Input
            id='userName'
            size='large'
            placeholder='Enter your AccountID'
            prefix={
              <UserOutlined type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id='password'
            size='large'
            placeholder='Enter your password'
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            type='primary'
            className='register'
            size='large'
            onClick={showModel}
          >
            Register
          </Button>
          <Modal
            visible={isVisible}
            title='Title'
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key='back' onClick={handleCancel}>
                Return
              </Button>,
              <Button
                key='submit'
                type='primary'
                // loading={loading}
                onClick={handleOk}
              >
                Submit
              </Button>,
            ]}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          <Button
            type='primary'
            className=' login'
            size='large'
            onClick={checkLogin}
          >
            Login
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
