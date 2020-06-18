import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import axios from 'axios';
import ServicePath from './../config/apiUrl';
const { Column } = Table;
function Comment() {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    getComment();
  }, []);
  const getComment = () => {
    axios({
      method: 'get',
      url: ServicePath.GetComment,
      withCredentials: true,
    }).then(res => {
      let data = res.data.comment
      console.log(data)
      data.forEach((element, index) => {
        element.key = index;
      });
      // 增加key 属性，优化
      setComment(data);
    });
  };
  const showInfo = () => {
    console.log(comment);
  };
  return (
    <Table dataSource={comment}>
      <Column title=' ID' dataIndex='id' key='id' />
      <Column title=' 小数ID' dataIndex='bookid' key='bookid' />
      <Column title='作者' dataIndex='userid' key='userid' />
      <Column title='内容' dataIndex='content' key='content' />
      <Column title='时间' dataIndex='date' key='date' />

      <Column
        title='Action'
        key='action'
        render={(text, record) => (
          <Space size='middle'>
            <a onClick={showInfo}>修改{record.id}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
}

export default Comment;
