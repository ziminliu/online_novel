import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { List, Comment } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';

import ServicePath from '../config/apiUrl';
// 展示所有评论
const CommentList = ({ id }) => {
  const [comments, setComments] = useState();
  // const [data, setData] = useState();
  useEffect(() => {
    getComments();
  }, []);
  const getComments = () => {
    console.log(id)
    // axios({
    //   method: 'get',
    //   url: ServicePath.GetComments + id,
    //   withCredentials: true,
    // }).then(res => {
    //   console.log(res.data.comments);
    //   setComments(res.data.comments);
    //   // let data = [];
    //   // res.data.comments.forEach(item => {
    //   //   data.push({
    //   //     author: item.name,
    //   //     avatar:
    //   //       'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //   //     content: <p>{item.content}</p>,
    //   //     datetime: item.date,
    //   //   });
    //   // });
    //   // console.log(data);
    //   // setData(data);
    // });
  };
  const data = [
    {
      author: 'Han Solo',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>fas</p>,
      datetime: moment().fromNow(),
    },
    {
      author: 'Han Solo',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>fas</p>,
      datetime: moment().fromNow(),
    },
    {
      author: 'Han Solo',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>fas</p>,
      datetime: moment().fromNow(),
    },
    {
      author: 'Han Solo',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>fas</p>,
      datetime: moment().fromNow(),
    },
  ];
  return (
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
};
export default CommentList;
