import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import ImageUploader from "vue-image-upload-resize";
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(ImageUploader);

Vue.config.productionTip = false;
new Vue({
  icon: {
    iconfont: 'md',
  },  
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");