import axios from "axios";

// import store from "./store";


import router from './router'

const API = axios.create({
  // baseURL: "http://localhost:9001/api",
  baseURL: "https://langtrackappdev.york.ac.uk/api",
  // baseURL: "https://lta-staging.ht.lu.se/api",
  // baseURL: "http://ht-lang-track.ht.lu.se:443/api",
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
