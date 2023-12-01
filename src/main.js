import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import store from "./store";
import moment from 'moment';

//Vue.use(require("moment")); // TODO try removing this line (https://stackoverflow.com/a/53892036/237509)

const firebaseConfig = require('./constants/admin.json');
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

const app = createApp(App)
app.use(store)
app.use(router)
app.use(moment)
app.mount("#app")
