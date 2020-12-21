import Vue from 'vue';
import Vuex from 'vuex';
import widget from './modules/widget.store';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    widget
  },
});
