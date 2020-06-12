'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.main.index);
  router.get('/getNovels', controller.user.main.getNovels);
  router.get('/getNovelDetails/:id', controller.user.main.getNovelDetails);
  // 获取评论信息
  router.get('/getComments/:id', controller.user.main.getComments);
};
