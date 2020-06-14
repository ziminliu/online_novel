'use strict';

module.exports = app => {
  const { router, controller } = app;
  const clientauth = app.middleware.clientAuth();
  router.get('/', controller.user.main.index);
  router.get('/getNovels', controller.user.main.getNovels);
  router.get('/getNovelDetails/:id', controller.user.main.getNovelDetails);
  // 获取评论信息
  router.get('/getComments/:id', controller.user.main.getComments);
  // 添加评论信息
  router.post('/addComment/', controller.user.main.addComment);
  // 验证登录
  router.post('/checkLogin/', controller.user.main.checkLogin);
};
