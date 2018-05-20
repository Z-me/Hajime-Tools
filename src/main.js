// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueVideoPlayer from 'vue-video-player'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyDYGu8enSh6x7tnDJAVvj6QkBJNJu1ADs0',
  authDomain: 'hajime-tools.firebaseapp.com',
  databaseURL: 'https://hajime-tools.firebaseio.com',
  projectId: 'hajime-tools',
  storageBucket: 'hajime-tools.appspot.com',
  messagingSenderId: '861806036049'
})

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueVideoPlayer)
Vue.use(firebase)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
