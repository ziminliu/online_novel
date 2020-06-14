'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, user';
  }
  async getNovels() {
    const { ctx } = this;
    const res = await this.app.mysql.query('select * from novel');
    ctx.body = { res };
  }
  async getNovelDetails() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await this.app.mysql.query(
      `select novel.id as id,novel.name,authorinfo.name as authorname,authorinfo.introduce as authorintro,novel.introduce as introduce,level,species,status,chapter,pagenum,votenum,img from novel join authorinfo on novel.author=authorinfo.id and novel.id=${id};`
    );
    console.log(res);
    ctx.body = { res };
  }
  // 获取本小说中评论信息 并降序排列
  async getComments() {
    const id = this.ctx.params.id;
    console.log(id);
    const comments = await this.app.mysql.query(
      `select * from comment join userinfo on userinfo.id = comment.userid and bookid =${id} order by date desc;`
    );
    console.log(comments);
    this.ctx.body = {
      comments,
    };
  }

  // 添加评论信息
  async addComment() {
    const { ctx } = this;
    const comment = {};
    comment.bookid = ctx.request.body.bookid;
    comment.userid = ctx.request.body.userid;
    comment.content = ctx.request.body.content;
    // console.log(comment);
    const result = await this.app.mysql.insert('comment', comment);
    if (result.affectedRows === 1) {
      ctx.body = {
        status: 'success',
      };
      console.log('插入成功');
    }
  }
  // 验证用户登录
  async checkLogin() {
    const { ctx } = this;
    const id = ctx.request.body.id;
    const password = ctx.request.body.password;
    const result = await this.app.mysql.get('userinfo', { id, password });
    console.log(result);
    if (result) {
      ctx.body = {
        data: 'success',
      };
      console.log('验证登录');
    } else {
      ctx.body = {
        data: 'failed',
      };
      console.log('登录失败');
    }
  }
}

module.exports = UserController;
