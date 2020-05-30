import Vue from 'vue';
import {get,post,fetch,patch,put,del} from './requset'
Vue.prototype.$get= get;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$del=del;
const _baseUrl=  process.env.VUE_APP_API_URL ;
//process.env.VUE_APP_API_URL;//这里我在项目配置文件里面设置了相对路径
console.log(_baseUrl);

//登录方法
const loginURL = `${_baseUrl}/admin/login`;
export const loginApi = function(username,passwd) {
  return Vue.prototype.$post(loginURL,{"user_name":username,"password":passwd})
};

