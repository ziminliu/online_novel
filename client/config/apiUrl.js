// 配置用户URL
const siteUrl = 'http://127.0.0.1:7001/';
let ServicePath = {
  CheckLogin: siteUrl + 'checkLogin',

  // 获取所有小说
  GetNovelList: siteUrl + 'getNovels',
  
  // 获取某一篇小说的详情
  GetNovelDetails: siteUrl + 'getNovelDetails/',

  GetUserInfo: siteUrl + 'getUserInfo',
  GetNovelById: siteUrl + 'getNovelById/',
};
export default ServicePath;
