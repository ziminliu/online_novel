/*
 * @Author: 刘子民
 * @Date: 2020-06-08 23:15:47
 * @LastEditTime: 2020-06-08 23:15:49
 */

const siteUrl = 'http://127.0.0.1:7001/admin/';
let ServicePath = {
  AddNovel: siteUrl + 'addNovel',
  CheckLogin: siteUrl + 'checkLogin',
  GetNovelList: siteUrl + 'getNovel',
  GetComment: siteUrl + 'getComment',
  GetUserInfo: siteUrl + 'getUserInfo',
  GetNovelById: siteUrl + 'getNovelById/',
  UpdateNovel: siteUrl + 'updateNovel/',
};
export default ServicePath;
