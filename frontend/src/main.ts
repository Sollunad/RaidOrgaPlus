import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.config.performance = true;

const opts = {
  theme: {
    dark: true,
  },

};

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
  vuetify: new Vuetify(opts),
  store: store(),
  router,
  render: h => h(App)
}).$mount('#app');
