import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;
Vue.config.performance = true;

const opts = {
  theme: {
    dark: true,
  },

};

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app');
