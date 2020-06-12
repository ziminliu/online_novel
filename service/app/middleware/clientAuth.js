'use strict';
module.exports = options => {
  return async function clientauth(ctx, next) {
    console.log(ctx.session.openId);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: 'nologin' };
    }
  };
};
