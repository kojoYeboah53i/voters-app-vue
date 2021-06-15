import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery'
import 'popper.js'
import '@fortawesome/fontawesome-free/css/all.css'    
import '@fortawesome/fontawesome-free/js/all.js' 
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'
import Toasted from 'vue-toasted'

Vue.use(Toasted)
Vue.prototype.$http = axios
Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyBF2huAM5LJGGfsgjYuj-ACxjwotbaeYGg",
  authDomain: "e-voting-app-21a51.firebaseapp.com",
  projectId: "e-voting-app-21a51",
  storageBucket: "e-voting-app-21a51.appspot.com",
  messagingSenderId: "390302735547",
  appId: "1:390302735547:web:2b7487190941f89d315d9e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
