import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, message } from 'antd';
import '../static/css/EditableTable.css';

import ServicePath from '../config/apiUrl';
import axios from 'axios';
const originData = [];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UpdateNovel = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    axios({
      method: 'get',
      url: ServicePath.GetNovelList,
      withCredentials: true,
    }).then(res => {
      // console.log(res.data.novelList[0])

      let data = res.data.novelList;
      // 添加key
      data.forEach((item, index) => {
        item.key = index + 1;
        // item.species = item.species.split(',');
        // item.status = item.status.split(' ');
        // console.log(item);
      });
      setData(data);
    });
  }, []);
  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    console.log(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      // console.log({ row }, '------------');
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        // 对数据进行修改
        let a = { id: newData[index].id, ...row };
        // console.log(a);
        axios({
          method: 'post',
          url: ServicePath.UpdateNovel,
          withCredentials: true,
          data: a,
        }).then(res => {
          if (res.data.status === 'success') {
            message.success('修改成功');
          } else {
            message.error('修改失败');
          }
        });
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        // 为找到，说明是新增一行
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      width: '3%',
      editable: false,
    },
    {
      title: 'id',
      dataIndex: 'id',
      width: '3%',
      editable: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '8%',
      editable: true,
    },
    {
      title: 'introduce',
      dataIndex: 'introduce',
      width: '20%',
      editable: true,
    },
    {
      title: 'author',
      dataIndex: 'author',
      width: '5%',
      editable: true,
    },
    {
      title: 'species',
      dataIndex: 'species',
      width: '8%',
      editable: true,
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: '5%',
      editable: true,
    },
    {
      title: 'chapter',
      dataIndex: 'chapter',
      width: '5%',
      editable: true,
    },
    {
      title: 'pagenum',
      dataIndex: 'pagenum',
      width: '5%',
      editable: true,
    },
    {
      title: 'votenum',
      dataIndex: 'votenum',
      width: '5%',
      editable: true,
    },
    {
      title: 'img',
      dataIndex: 'img',
      width: '10%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href='javascript:;'
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default UpdateNovel;
