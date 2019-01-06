<template>
  <div id="app">
    <vue-menu @login="login" @logout="logout" @snack="setSnackbar">
      <div slot="main-container">
        <router-view class="main-content"></router-view>
      </div>
    </vue-menu>
    <!--
    <div class="main-content">

      <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title"><h2 style="flex: 1">Hajime Tools</h2></span>
          </div>

          <button class="md-button top-menu" v-if="!loginState" @click="showLoginModal">
            <md-icon>assignment_ind</md-icon>
            ログイン
          </button>
          <button class="md-button top-menu" v-else @click="logout()">
            <md-icon>directions_run</md-icon>
            ログアウト
          </button>

          <router-link to="/" class="md-button top-menu">
            <md-icon>record_voice_over</md-icon>
            メモ
          </router-link>
          <router-link to="/health" class="md-button top-menu">
            <md-icon>directions_walk</md-icon>
            ケンコー
          </router-link>
          <router-link to="/house" class="md-button top-menu">
            <md-icon>attach_money</md-icon>
            カケイボ
          </router-link>
          <router-link to="/kpt" class="md-button top-menu">
            <md-icon>autorenew</md-icon>
            KPT
          </router-link>
          <router-link to="/video-player" class="md-button top-menu">
            <md-icon>local_movies</md-icon>
            Video
          </router-link>
        </div>

      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0"><Hajime-tools</md-toolbar>

        <md-list>
          <md-list-item>
            <router-link to="/" class="md-button top-menu">
              <md-icon>record_voice_over</md-icon>
              メモ
            </router-link>
          </md-list-item>

          <md-list-item>
            <router-link to="/health" class="md-button top-menu">
              <md-icon>directions_walk</md-icon>
              ケンコー
            </router-link>
          </md-list-item>

          <md-list-item>
            <router-link to="/house" class="md-button top-menu">
              <md-icon>attach_money</md-icon>
              カケイボ
            </router-link>
          </md-list-item>

          <md-list-item>
            <router-link to="/kpt" class="md-button top-menu">
              <md-icon>autorenew</md-icon>
              KPT
            </router-link>
          </md-list-item>

          <md-list-item>
            <router-link to="/video-player" class="md-button top-menu">
              <md-icon>local_movies</md-icon>
              Video
            </router-link>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content class="viewing-contents">
        <router-view></router-view>
      </md-app-content>
    </md-app>

    <Modal ref='modal'>
      <Login ref='auth' @close='closeModal' @snack='setSnackbar' :login-state="loginState" :login-message="message"></Login>
    </Modal>

    <md-snackbar md-position="center" md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ snackbarMessage }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">閉じる</md-button>
    </md-snackbar>

  </div> -->
  </div>
</template>

<script>
// import firebase from 'firebase'
// import Auth from '@/lib/Auth'
// import Modal from '@/components/Modal'
import VueMenu from '@/components/menu'
export default {
  name: 'app',
  components: {
    // Modal,
    VueMenu
  },
  data: () => ({
    auth: null,
    menuVisible: false,
    loginState: false,
    message: 'test comment',
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    snackbarMessage: ''
  }),
  methods: {
    async login (mail, password) {
      let res = await this.auth.login(mail, password)
      console.log('res', res.result)
      if (res.result) {
        // TODO: set Snackbar
        return res.result
      }
    },
    logout () {
      this.auth.logout()
      /*
      firebase.auth().signOut().then(function () {
        console.log('logout success')
      }).catch(function (error) {
        console.log('logout false', error)
      }) */
    },
    showLoginModal () {
      this.$refs.modal.modalControl(true)
    },
    closeModal (state) {
      this.$refs.modal.modalControl(false)
    },
    setSnackbar (msg) {
      this.snackbarMessage = msg
      this.showSnackbar = true
    } /* ,
    setUserAuth () {
      this.userName = this.auth.getUser()
      this.isLogin = this.auth.checkLogin()
    } */
  },
  created () {
    // this.auth = new Auth()
  },
  mounted () {
    // setTimeout(this.setUserAuth, 2000)
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
.md-app {
  border: 1px solid rgba(#000, .12);
  height: 100vh !important;
}
.md-drawer {
  background-color: #30A8F8;
  color: #FFFFFF;
  min-width: 200px !important;
  max-width: 20vw !important;
}
.md-toolbar {
  background-color: #30A8F8;
  color: #FFFFFF;
  min-height: 70px !important;
  height: 10vh !important;
  padding: 0 !important;
  width: 100vw !important;
}
.md-toolbar-row {
  background-color: #30A8F8;
}
.top-menu {
  color: #FFFFFF;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.main-content {
  height: 100vh !important;
}
.viewing-contents {
  padding: 16px;
}
.md-dialog-container {
  background: #FFFF !important;
  padding: 1vh !important;
}
.md-datepicker-header {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #FFF;
  background: #30A8F8;
}
.md-datepicker-body {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFF;
}
.md-datepicker-selected {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  flex-flow: column;
  vertical-align: top;
  color: #30A8F8;
  border: 4px solid #30A8F8;
}
.md-list {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.md-field {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.md-menu-content-container {
  background: #FFF;
  color: #30A8F8;
}
select[name=dateSelect]::placeholder {
  color: #FFF !important;
}
</style>
