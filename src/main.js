import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import ajax from './assets/js/ajax'
import ajaxAll from './assets/js/ajaxAll'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$ajax = ajax;
Vue.prototype.$ajaxAll = ajaxAll;
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
