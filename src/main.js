import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import store from "./store";

Vue.config.productionTip = false

Vue.use(require("moment")); // TODO try removing this line (https://stackoverflow.com/a/53892036/237509)

// const configOptions = {
//   apiKey: "",
//   authDomain: "vue-firebase-auth-2802d.firebaseapp.com",
//   databaseURL: "https://vue-firebase-auth-2802d.firebaseio.com",
//   projectId: "vue-firebase-auth-2802d",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// };

const firebaseConfig = require('./admin.json');
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');