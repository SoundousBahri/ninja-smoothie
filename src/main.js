// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'
import firebase from "firebase";

Vue.use(VueChatScroll);
Vue.config.productionTip = false;

let app = null;


//wait for firebase auth
firebase.auth().onAuthStateChanged(() => {

  if (!app) {
    //init app if not already created
    app = new Vue({
      el: '#app',
      router,
      components: {App},
      template: '<App/>'
    })

  }
});
