import axios from "axios";
import router from './router'
// import store from "./store";

const config = require("./constants/api.json");

const API = axios.create({
  baseURL: config["baseURL"],
  headers: {
    "Content-type": "application/json"
    // "token": store ? (store.state.user ? JSON.stringify(store.state.user.data) : "no user") : "no store"
  }
})

API.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error.response.data)
  if (error.response.status === 401) {
    // store.dispatch('logout')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default API;
