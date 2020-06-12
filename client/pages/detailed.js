import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import CommentList from '../components/CommentList';
import axios from 'axios';
import ServicePath from '../config/apiUrl';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Comment, Avatar, Form, Button, Input } from 'antd';

const { TextArea } = Input;
const { Meta } = Card;

const Detail = info => {
  const [novel, setNovel] = useState({});
  const [id, setId] = useState();
  useEffect(() => {
    setNovel(info);
    // console.log(info.id,'++++++')
    setId(info.id);
  }, []);
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          loading={submitting}
          onClick={onSubmit}
          type='primary'
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
  return (
    <div>
      <Head>
        <title>在线小说阅读</title>
      </Head>
      <Header />
      <br />
      <br />
      <br />
      <Row>
        <Col span={12} offset={6} gutter={15}>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 290 }}
                  cover={<img alt='example' src={novel.img} />}
                >
                  <Meta title={novel.authorname} />
                </Card>
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={24}>
                    <Card
                      title={'《' + novel.name + '》'}
                      bordered={true}
                      // style={{ width: 500 }}
                    >
                      <p>作者：{novel.authorname}</p>
                      <p>作者简介：{novel.authorintro}</p>
                      <p>小说简介：{novel.introduce}</p>
                      <p>类型：{novel.species}</p>
                      <p>状态：{novel.status}</p>
                      <p>章节：{novel.chapter}</p>
                      <p>页数：{novel.pagenum}</p>
                      <p>点赞数：{novel.votenum}</p>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* 发表评论 */}

      {/* 评论区 发表评论 */}
      <Row>
        <Col span={16} offset={4}>
          <Comment
            avatar={
              <Avatar
                src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                alt='Han Solo'
              />
            }
            content={
              <Editor
              // onChange={this.handleChange}
              // onSubmit={this.handleSubmit}
              // submitting={submitting}
              // value={value}
              />
            }
          />
        </Col>
      </Row>
      {/* 评论区 */}
      <CommentList id={id}></CommentList>
    </div>
  );
};

Detail.getInitialProps = async context => {
  console.log(context.query.id);
  let id = context.query.id;
  // console.log(id);
  const promise = new Promise(resolve => {
    axios(ServicePath.GetNovelDetails + id).then(res => {
      console.log(res.data.res[0], '---------');
      resolve(res.data.res[0]);
    });
  });
  return await promise;
};
export default Detail;
