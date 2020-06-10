'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 引入管理员路由
  require('./router/admin')(app);
  // 引入用户路由
  require('./router/user')(app);
};
