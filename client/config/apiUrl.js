// 配置用户URL
const siteUrl = 'http://127.0.0.1:7001/';
let ServicePath = {
  // 获取所有小说
  GetNovelList: siteUrl + 'getNovels',

  // 获取某一篇小说的详情
  GetNovelDetails: siteUrl + 'getNovelDetails/',
  // 获取某一篇小说内的评论
  GetComments: siteUrl + 'getComments/',
  // 添加评论信息
  AddComment: siteUrl + 'addComment/',
  // 验证登录
  CheckLogin: siteUrl + 'checkLogin',
  // 注册用户
  AddUser: siteUrl + 'addUser',
  // 用户点赞
  AddLike: siteUrl + 'addLike',
};
export default ServicePath;
