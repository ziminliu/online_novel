/*
 * @Author: 刘子民
 * @Date: 2020-06-08 22:54:55
 * @LastEditTime: 2020-06-08 23:17:42
 */ 
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import '../static/css/AdminIndex.css';
import AdminIndex from './AdminIndex';
import Register from './Register';

function Main() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/register/'  component={Register} />
      {/* 含有子路由的组件不能设置精确匹配 */}
      <Route path='/index/'  component={AdminIndex} />
    </Router>
  );
}

export default Main;
