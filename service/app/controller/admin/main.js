'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, admin';
  }
  async checkLogin() {
    const { ctx } = this;
    const username = ctx.request.body.userName;
    const password = ctx.request.body.password;
    // console.log(username, password);
    const sql = `select * from admininfo where id="${username}" and password = "${password}"`;
    // 执行查询语句
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = {
        status: 'success',
        openId,
      };
      // console.log('成功')
    } else {
      ctx.body = {
        status: 'failed',
      };
    }
  }
  async addNovel() {
    const novel = this.ctx.request.body;
    const id = novel.id;
    // 判断小说id 是否有重复插入
    console.log(id);
    const res = await this.app.mysql.get('novel', { id });
    console.log(res);
    console.log(res.affectedRows);
    if (res.affectedRows === 1) {
      this.ctx.body = {
        status: 'failed',
      };
    } else {
      const result = await this.app.mysql.insert('novel', novel);
      if (result.affectedRows === 1) {
        this.ctx.body = {
          status: 'success',
        };
      }
    }

    // this.ctx.body = { novel };
    // console.log(result);
  }
}

module.exports = AdminController;
