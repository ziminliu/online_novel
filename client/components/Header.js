import React from 'react';
import '../public/style/components/header.css';
import Link from 'next/link';

import { Row, Col, Menu } from 'antd';
const Header = () => (
  <div className='header'>
    <Row type='flex' justify='center'>
      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
        <Link href='/'>
          <a className='header-logo'>在线小说</a>
        </Link>
        <span className='header-txt'>你想看的小说这里都有</span>
      </Col>
      <Col className='memu-div' xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode='horizontal'>
          <Menu.Item key='home'>
            <Link href='/'>
              <a>首页</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='video'>
            <Link href='/login'>
              <a>登录</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='life'>
            <Link href='/'>
              <a>退出</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
);

export default Header;
