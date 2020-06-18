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
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // id 只能为数字的判断
    console.log(id,Number(id))
    console.log(id == Number(id))
    if (! (id == Number(id))) {
      message.error('账号只能为数字');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    }
    if (!id) {
      message.error('账号不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    } else if (!name) {
      message.error('用户名不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    } else if (!password) {
      message.error('密码不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    } else if (password !== cpassword) {
      message.error('两次密码不相同');
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    }
    let dataProps = {
      id,
      password,
      name,
    };
    // 发起请求注册用户
    axios({
      method: 'post',
      url: ServicePath.RegisterAdmin,
      data: dataProps,
      withCredentials: true,
    }).then(res => {
      setIsLoading(false);
      console.log(res);
      if (res.data.status === 'success') {
        message.success('注册成功，请登录')
        props.history.push('/');
      } else {
        message.error('id 已被占用');
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    console.log(dataProps);
  };
  return (
    <div className='login-div'>
      <Spin tip='Loading...' spinning={isLoading}>
        <Card title='在线小说连载网站' bordered={true} style={{ width: 400 }}>
          <Input
            id='id'
            size='large'
            placeholder='Enter your AccountID'
            prefix={
              <UserOutlined type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            onChange={e => {
              setId(e.target.value);
            }}
          />
          <br />
          <br />
          <Input
            id='name'
            size='large'
            placeholder='Enter your name'
            prefix={
              <UserOutlined type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            onChange={e => {
              setName(e.target.value);
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
          <Input.Password
            id='cpassword'
            size='large'
            placeholder='Check your password'
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {
              setCpassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            type='primary'
            className='register'
            size='large'
            onClick={handleRegister}
          >
            Register
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
