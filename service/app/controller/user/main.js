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
  // 获取本小说中评论信息
  async getComments() {
    const id = this.ctx.params.id;
    console.log(id);
    const comments = await this.app.mysql.query(`select * from comment join userinfo on userinfo.id = comment.userid and bookid =${id}`);
    console.log(comments);
    this.ctx.body = {
      comments,
    };
  }
}

module.exports = UserController;
