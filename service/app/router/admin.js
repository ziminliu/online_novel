'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 管理员访问首页
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  // 添加小说
  router.post('/admin/addNovel', controller.admin.main.addNovel);
};
