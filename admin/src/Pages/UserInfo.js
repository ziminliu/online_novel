import React, { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import axios from 'axios';
import ServicePath from './../config/apiUrl';
const { Column } = Table;
function UserInfo() {
  const [userinfo, setUserinfo] = useState([]);
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = () => {
    axios({
      method: 'get',
      url: ServicePath.GetUserInfo,
      withCredentials: true,
    }).then(res => {
      let users = res.data.userinfo
      console.log(users)
      users.forEach((element, index) => {
        element.key = index+1;
      });
      // 增加key 属性，优化
      setUserinfo(users);
    });
  };
  const showInfo = () => {
    console.log(userinfo);
  };
  return (
    <Table dataSource={userinfo}>
      <Column title=' 序号' dataIndex='key' key='key' />
      <Column title=' ID' dataIndex='id' key='id' />
      <Column title=' 密码' dataIndex='password' key='password' />
      <Column title=' 姓名' dataIndex='name' key='name' />

      <Column
        title='Action'
        key='action'
        render={(text, record) => (
          <Space size='middle'>
            <a onClick={showInfo}>修改{record.id}</a>
            <a>删除</a>
          </Space>
        )}
      />
    </Table>
  );
}

export default UserInfo;
