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
      `select novel.name,authorinfo.name,introduce,level,species,status,chapter,pagenum,votenum,img from novel join authorinfo on novel.author=authorinfo.id and novel.id=${id};`
    );
    console.log(res);
    ctx.body = { res };
  }
}

module.exports = UserController;
