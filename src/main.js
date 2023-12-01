import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = require('./constants/admin.json');
const fb_app = initializeApp(firebaseConfig);
const fb_auth = getAuth(fb_app);
onAuthStateChanged(fb_auth, (user) => {
  store.dispatch("fetchUser", user);
});

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")
