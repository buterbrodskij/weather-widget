import Vue from 'vue';
import App from './App.vue';
import '@/scss/index.scss';
import store from './store/store';
import '@/plugins/element-ui';
import '@/plugins/axios';


Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('weather-widget');
