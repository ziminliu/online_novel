'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.main.index);
  router.get('/getNovels', controller.user.main.getNovels);
  router.get('/getNovelDetails/:id', controller.user.main.getNovelDetails);
};
