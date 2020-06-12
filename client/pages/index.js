import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Novels from '../components/Novels';
import { Row, Col } from 'antd';
const Home = () => (
  <>
    <Head>
      <title>在线小说阅读</title>
    </Head>
    <Header />
    <br />
    <br />
    <br />
    <Novels />
  </>
);

export default Home;
