import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用iconfont 图标
import './assets/iconfont/iconfont.css';
import axios from "axios";
//使用vue-echarts
import ECharts from 'vue-echarts'; // 在 webpack 环境下指向 components/ECharts.vue
import 'echarts';
require('./mock/index.js')
// 将axios挂载到Vue实例,在组件中可以直接使用 为了mock本地数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

Vue.use(ElementUI)
// 注册全局的组件
Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
