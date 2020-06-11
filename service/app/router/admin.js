'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 管理员访问首页
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  // 添加小说
  router.post('/admin/addNovel', controller.admin.main.addNovel);
  // 获取小说列表
  router.get('/admin/getNovel', controller.admin.main.getNovel);
  // 获取评论列表
  router.get('/admin/getComment', controller.admin.main.getComment);
  // 获取用户信息
  router.get('/admin/getUserInfo', controller.admin.main.getUserInfo);
  // 根据id查询小说
  router.get('/admin/getNovelById/:id', controller.admin.main.getNovelById);
};
