import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
// 导入全局样式表
import "./assets/css/global.css";
// 字体图标库
import "./assets/fonticon/css/font-awesome.min.css";
import axios from "axios";
import qs from "qs";
// // 请求根路径
// axios.defaults.baseURL = "F:/Programing/phpstudy_pro/WWW/api/";
//引入cookie操作
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
