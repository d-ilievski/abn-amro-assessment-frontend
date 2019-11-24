import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import plugins
import "./assets/plugins/FontAwesome/css/all.min.css"
import "vue-wysiwyg/dist/vueWysiwyg.css";
import wysiwyg from "vue-wysiwyg";
// import helpers
import {debounce} from './utils/helpers';

// Plugins
Vue.use(wysiwyg, {});
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

// Pub Sub
Vue.prototype.$eventBus = new Vue();

// Helpers
Vue.prototype.$helpers = {
  debounce
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
