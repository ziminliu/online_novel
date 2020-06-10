'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.main.index);
};
