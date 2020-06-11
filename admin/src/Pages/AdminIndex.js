import React from 'react';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook';
import Update from './Update';
import Welcome from './Welcome';
import UserInfo from './UserInfo';
import Comment from './Comment';
import AddNovel from './AddNovel';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
function AdminIndex(props) {
  const handleNovel = e => {
    console.log(e.key);
    // 小说管理的路由处理
    if (e.key === 'addnovel') {
      // 跳转到章节查询的页面
      props.history.push('/index/addnovel');
    } else if (e.key === 'search') {
      props.history.push('/index/search');
    } else {
      props.history.push('/index/update');
    }
  };
  const handleUser = () => {
    props.history.push('/index/userList');
  };
  const handleComment = () => {
    props.history.push('/index/comment');
  };
  const handleHeader = () => {
    props.history.push('/index');
  };
  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          onClick={handleHeader}
        >
          <Menu.Item key='1'>小说管理首页</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key='sub1'
              icon={<BookOutlined />}
              title='小说管理'
              onClick={handleNovel}
            >
              <Menu.Item key='addnovel'>添加小说</Menu.Item>
              <Menu.Item key='update'>更新小说</Menu.Item>
              <Menu.Item key='search'>章节查询</Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub2'
              icon={<UserOutlined />}
              title='用户信息管理'
              onClick={handleUser}
            >
              <Menu.Item key='modify'>修改信息</Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub3'
              icon={<UserOutlined />}
              title='评论管理'
              onClick={handleComment}
            >
              <Menu.Item key='comment'>评论管理</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div>
              <div>
                <Route path='/index/' exact component={Welcome} />
                <Route path='/index/search/' exact component={SearchBook} />
                <Route path='/index/update' exact component={Update} />
                <Route path='/index/addnovel' exact component={AddNovel} />
                <Route path='/index/userList' exact component={UserInfo} />
                <Route path='/index/comment' exact component={Comment} />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
