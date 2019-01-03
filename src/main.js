// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'
import VueVideoPlayer from 'vue-video-player'
import firebase from 'firebase'
import firebaseEnv from './.firebaseEnv.json'

firebase.initializeApp(firebaseEnv)

Vue.config.productionTip = false
// Vue.use(VueMaterial)
Vue.use(Vuetify)
Vue.use(VueVideoPlayer)
Vue.use(firebase)
Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
