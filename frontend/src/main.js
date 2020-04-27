import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify/lib';
import Vuex from 'vuex';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import store from './store';

Vue.config.productionTip = false;
Vue.config.performance = true;

const opts = {
  theme: {
    dark: true,
  },

};

Vue.use(Vuetify);
Vue.use(Vuex);

new Vue({
  vuetify: new Vuetify(opts),
  store: store(),
  render: h => h(App)
}).$mount('#app');
