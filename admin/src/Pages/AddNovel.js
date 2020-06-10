import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import axios from 'axios';
import ServicePath from './../config/apiUrl';
const { Option } = Select;
const layout = {
  // flex 布局 24
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
};
const validateMessages = {
  required: '${label} 不能为空!',
  types: {
    number: '${label} 请输入数字',
  },
};
function AddNovel() {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState(0);
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('');
  const [chapter, setChapter] = useState(0);
  const [pagenum, setPagenum] = useState(0);
  const [votenum, setVotenum] = useState(0);
  const [img, setImg] = useState('');
  const onFinish = values => {
    // console.log(id);
  };
  const postNovel = function () {
    var novel = {
      id,
      name,
      author,
      species,
      status,
      chapter,
      pagenum,
      votenum,
      img,
    };
    // 发送 POST 请求
    axios({
      method: 'post',
      url: ServicePath.AddNovel,
      data: novel,
      withCredentials: true,
    }).then(res => {
      console.log('请求发送成功');
      console.log(res);
    });
    console.log(novel);
  };
  return (
    <Form
      {...layout}
      name='nest-messages'
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['user', 'id']}
        label='小说ID'
        rules={[
          {
            type: 'number',
            required: true,
          },
        ]}
      >
        <InputNumber
          style={{ width: 200 }}
          onBlur={e => {
            setId(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item
        name={['user', 'name']}
        label='名称'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          onBlur={e => {
            setName(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item
        name={['user', 'author']}
        label='作者编号'
        rules={[
          {
            type: 'number',
            required: true,
          },
        ]}
      >
        <InputNumber
          style={{ width: 200 }}
          onBlur={e => {
            setAuthor(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item name={['user', 'species']} label='类别' rules={[{}]}>
        <Input
          onBlur={e => {
            setSpecies(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item
        name={['user', 'status']}
        label='状态'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          defaultValue='select'
          style={{ width: 120 }}
          onChange={value => setStatus(value)}
        >
          <Option value='select' disabled>
            请选择
          </Option>
          <Option value='updating'>更新中</Option>
          <Option value='finished'>已完结</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['user', 'chapter']}
        label='章节'
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          onBlur={e => {
            setChapter(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item
        name={['user', 'pagenum']}
        label='页数'
        rules={[
          {
            type: 'number',
            required: true,
          },
        ]}
      >
        <InputNumber
          onBlur={e => {
            setPagenum(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item
        name={['user', 'votenum']}
        label='点赞数'
        rules={[
          {
            type: 'number',
            required: true,
          },
        ]}
      >
        <InputNumber
          onBlur={e => {
            setVotenum(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item name={['user', 'images']} label='图片'>
        <Input
          onBlur={e => {
            setImg(e.currentTarget.value);
          }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit' onClick={postNovel}>
          添加
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddNovel;
