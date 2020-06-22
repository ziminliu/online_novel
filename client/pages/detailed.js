import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
// import CommentList from '../components/CommentList';
import axios from 'axios';
import ServicePath from '../config/apiUrl';
import { List, message } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Comment, Avatar, Form, Button, Input } from 'antd';
import Link from 'next/link';
import { LikeOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Meta } = Card;

// 留言组件
const CommentList = ({ data }) => (
  <Row>
    <Col span={16} offset={4}>
      <List
        dataSource={data}
        header={`${data.length} ${data.length > 1 ? '条评论' : '条评论'}`}
        itemLayout='horizontal'
        renderItem={props => <Comment {...props} />}
      />
    </Col>
  </Row>
);

const Detail = info => {
  const [novel, setNovel] = useState({});
  const [id, setId] = useState();
  const [vote, setVote] = useState(info.votenum);
  const [comments, setComments] = useState([]);
  let content = '';
  useEffect(() => {
    setNovel(info);
    setId(info.id);
    getComments();
  }, []);

  // 获取评论
  const getComments = () => {
    console.log(info.id);
    axios({
      method: 'get',
      url: ServicePath.GetComments + info.id,
      withCredentials: true,
    }).then(res => {
      console.log(res.data.comments);
      // setComments(res.data.comments);
      let data = [];
      res.data.comments.forEach(item => {
        data.push({
          author: item.name,
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{item.content}</p>,
          datetime: item.date,
        });
      });
      console.log(data);
      setComments(data);
    });
  };

  const Editor = ({ onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={handleChange} />
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

  const handleChange = e => {
    content = e.target.value;
  };

  // 处理点赞  节流
  const Throtten = (fn, delay) => {
    var timer;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(fn, delay);
    };
  };

  const Modify = () => {
    let data = Object.assign({}, info);
    data.votenum = vote + 1;
    console.log(info, data);
    axios({
      method: 'post',
      url: ServicePath.AddLike,
      data: data,
      withCredentials: true,
    }).then(res => {
      if (res.data.data === 'success') {
        message.success('点赞成功');
      } else {
        message.error('点赞失败');
      }
    });
  };

  const handleClick = async () => {
    setVote(vote + 1);
    Modify();
  };

  const modifyThrotten = Throtten(Modify, 1000);
  // 提交评论的方法
  const handleSubmit = e => {
    if (localStorage.getItem('userId')) {
      console.log(localStorage.getItem('userId'));
      let comment = {};
      comment.bookid = id;
      comment.userid = localStorage.getItem('userId');
      comment.content = content;
      // console.log(comment);
      axios({
        method: 'post',
        url: ServicePath.AddComment,
        data: comment,
        withCredentials: true,
      }).then(res => {
        if (res.data.status === 'success') {
          message.success('添加成功');
          getComments();
        } else {
          console.log(res);
          message.error('添加失败');
        }
      });
    } else {
      message.error('请先登录');
    }
  };
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
                      <p>
                        点赞数：{vote}{' '}
                        <a onClick={handleClick}>
                          <LikeOutlined />
                        </a>{' '}
                      </p>
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
                // onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={false}
              />
            }
          />
        </Col>
      </Row>
      {/* 评论区 */}
      {comments.length > 0 && <CommentList data={comments} />}
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
