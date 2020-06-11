import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import axios from 'axios';
import ServicePath from './../config/apiUrl';
import { Modal, Button } from 'antd';
const { Column } = Table;
function Update() {
  const [novelList, setNovelList] = useState(['1']);
  const [list, setList] = useState();
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    getNovelList();
  }, []);
  const getNovelList = () => {
    axios({
      method: 'get',
      url: ServicePath.GetNovelList,
      withCredentials: true,
    }).then(res => {
      setNovelList(res.data.novelList);
      let data = res.data.novelList;
      data.forEach((item, index) => {
        item.key = index + 1;
        item.species = item.species.split(',');
        item.status = item.status.split(' ');
        console.log(item);
      });
      console.log(data[0]);
      setList(data);
    });
  };
  const showInfo = () => {
    console.log(novelList);
  };
  return (
    <Table dataSource={list}>
      <Column title='序号' dataIndex='key' key='key' />
      <Column title=' ID' dataIndex='id' key='id' />
      <Column title=' 名称' dataIndex='name' key='name' />
      <Column title='作者' dataIndex='author' key='author' />
      <Column
        title='种类'
        dataIndex='species'
        key='species'
        render={tags => (
          <>
            {tags.map(tag => (
              <Tag color='blue' key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      />
      <Column
        title='状态'
        dataIndex='status'
        key='status'
        render={tags => (
          <>
            {tags.map(tag => (
              <Tag color='blue' key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      />
      <Column title='章节' dataIndex='chapter' key='chapter' />
      <Column title='页码' dataIndex='pagenum' key='pagenum' />
      <Column title='点赞数' dataIndex='votenum' key='votenum' />
      <Column title='图片' dataIndex='img' key='img' />

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

export default Update;
