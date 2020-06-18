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
    if (!res) {
      // id 未重名 可以插入
      console.log('id有效');
      const res = await this.app.mysql.insert('novel', novel);
      if (res.affectedRows === 1) {
        this.ctx.body = {
          status: 'success',
        };
      } else {
        this.ctx.body = {
          status: 'failed',
        };
      }
    } else {
      console.log('id 已被占用');
      this.ctx.body = { status: 'used' };
    }
  }
  async getNovel() {
    const novelList = await this.app.mysql.query('select * from novel');
    // console.log(novelList);
    this.ctx.body = {
      novelList,
    };
  }
  // 获取评论信息
  async getComment() {
    const comment = await this.app.mysql.query('select * from comment');
    // console.log(comment);
    this.ctx.body = {
      comment,
    };
  }
  async getUserInfo() {
    const userinfo = await this.app.mysql.query('select * from userinfo');
    // console.log(comment);
    this.ctx.body = {
      userinfo,
    };
  }
  async getNovelById() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await this.app.mysql.query(
      `select * from novel where id like '%${id}%' `
    );
    if (res) {
      ctx.body = {
        res,
      };
    } else {
      ctx.body = {
        res: 'no data',
      };
    }
  }
  // 更新小说信息
  async updateNovel() {
    const { ctx } = this;
    const newdata = ctx.request.body;
    const result = await this.app.mysql.update('novel', newdata);
    // console.log(result);
    if (result.affectedRows === 1) {
      ctx.body = {
        status: 'success',
      };
    } else {
      ctx.body = {
        status: 'failed',
      };
    }
  }
}

module.exports = AdminController;
