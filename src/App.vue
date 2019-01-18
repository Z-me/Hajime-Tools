<template>
  <div id="app">
    <v-app>
      <vue-menu @snack="setSnackbar">
        <div slot="main-container">
          <router-view class="main-content"></router-view>
        </div>
      </vue-menu>
      <v-snackbar
        v-model="showSnackbar"
        :color="snackbarColor"
        :timeout="snackbarTimeout"
        multi-line
        bottom
        right
        >
        {{ snackbarMessage }}
        <v-btn
          dark
          flat
          @click="showSnackbar = false"
          >
          閉じる
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import VueMenu from '@/components/menu'
export default {
  name: 'app',
  components: {
    VueMenu
  },
  data: () => ({
    auth: null,
    menuVisible: false,
    loginState: false,
    message: 'test comment',
    showSnackbar: false,
    snackbarColor: 'cyan darken-2',
    snackbarMessage: '',
    snackbarTimeout: 3000,
    position: 'center',
    duration: 4000
  }),
  methods: {
    showLoginModal () {
      this.$refs.modal.modalControl(true)
    },
    closeModal (state) {
      this.$refs.modal.modalControl(false)
    },
    setSnackbar (type, msg) {
      this.snackbarMessage = msg
      this.snackbarColor = type === 'success' ? 'cyan darken-2' : 'pink accent-2'
      this.showSnackbar = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh !important;
  margin: 0px;
}
input {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
