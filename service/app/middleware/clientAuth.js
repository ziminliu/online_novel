'use strict';
module.exports = () => {
  return async function clientauth(ctx, next) {
    console.log(ctx.session);
    if (ctx.session.userId) {
      await next();
    } else {
      ctx.body = { data: 'nologin' };
    }
  };
};
