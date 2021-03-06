import React, { useState, useEffect, Fragment } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  message,
  Col,
  Row,
} from 'antd';
import '../static/css/EditableTable.css';
import axios from 'axios';
import ServicePath from '../config/apiUrl';

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

const UserInfo = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState();
  const [editingKey, setEditingKey] = useState('');
  const getUserList = () => {
    axios({
      method: 'get',
      url: ServicePath.GetUserInfo,
      withCredentials: true,
    }).then(res => {
      let data = res.data.userinfo;
      // 添加key
      data.forEach((item, index) => {
        item.key = index + 1;
        // item.species = item.species.split(',');
        // item.status = item.status.split(' ');
        // console.log(item);
      });
      setUser(data);
    });
  };
  useEffect(() => {
    getUserList();
  }, []);
  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    // console.log(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const deleteRow = record => {
    axios({
      method: 'delete',
      url: ServicePath.DeleteUserinfo,
      withCredentials: true,
      data: record,
    }).then(res => {
      console.log(res);
      if (res.data.status === 'success') {
        message.success('删除成功');
        getUserList();
      } else {
        message.error('删除失败');
      }
    });
  };
  const save = async key => {
    try {
      const row = await form.validateFields();
      // console.log({ row }, '------------');
      const newData = [...user];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        // 对数据进行修改
        let a = { id: newData[index].id, ...row };
        console.log(a);
        axios({
          method: 'post',
          url: ServicePath.UpdateUserinfo,
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
        setUser(newData);
        setEditingKey('');
      } else {
        // 为找到，说明是新增一行
        newData.push(row);
        setUser(newData);
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
      width: '20%',
      editable: false,
    },
    {
      title: 'id',
      dataIndex: 'id',
      width: '20%',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: 'password',
      dataIndex: 'password',
      width: '20%',
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
          <Fragment>
            <Row>
              <Col span={12}>
                <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </a>
              </Col>
              <Col span={12}>
                <Popconfirm
                  title='Are you sure to delete this row？'
                  okText='Yes'
                  cancelText='No'
                  onCancel={cancel}
                  onConfirm={() => deleteRow(record)}
                >
                  <a href=''>Delete</a>
                </Popconfirm>
              </Col>
            </Row>
          </Fragment>
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
        dataSource={user}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default UserInfo;
