import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import ImageUploader from "vue-image-upload-resize";
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'


Vue.use(ImageUploader);

// Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.headers.get['Accept'] = 'application/json'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + token
}

Vue.config.productionTip = false;
new Vue({
  store,
  icon: {
    iconfont: 'md',
  },  
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");