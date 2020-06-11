import React, { useState } from 'react';
import { Input } from 'antd';
import { Table, Tag } from 'antd';
import axios from 'axios';
import ServicePath from './../config/apiUrl';

const { Column } = Table;
const { Search } = Input;
function SearchBook() {
  const [resNovel, setResNovel] = useState([]);
  const getBookById = id => {
    console.log(id);
    axios({
      method: 'get',
      url: ServicePath.GetNovelById + id,
      withCredentials: true,
    }).then(res => {
      let data = res.data.res;
      data.forEach((item, index) => {
        item.key = index + 1;
        item.species = item.species.split(',');
        item.status = item.status.split(' ');
      });
      setResNovel(data);
    });
  };
  return (
    <>
      搜索：
      <Search
        placeholder='请输入id 或 名称'
        onSearch={value => getBookById(value)}
        style={{ width: 200 }}
      />
      <Table dataSource={resNovel}>
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
      </Table>
    </>
  );
}
export default SearchBook;
