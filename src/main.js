import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
import VueSimpleAlert from "vue-simple-alert";
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
import "font-awesome/css/font-awesome.min.css";
//import 'vue-toast-notification/dist/theme-sugar.css';
import VueHtml2Canvas from 'vue-html2canvas';
import UUID from "vue-uuid";
import VueMasonry from 'vue-masonry-css'

Vue.use(UUID);
Vue.use(VueHtml2Canvas);
Vue.use(VueToast);
Vue.use(VueSimpleAlert);
// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VueMasonry);

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})
