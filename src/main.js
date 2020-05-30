import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用iconfont 图标
import './assets/iconfont/iconfont.css'
import axios from "axios";
require ('./mock/index.js')
// 将axios挂载到Vue实例,在组件中可以直接使用 为了mock本地数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
