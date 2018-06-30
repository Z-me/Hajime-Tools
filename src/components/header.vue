<template>
  <div class="header">



    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title"><h2 style="flex: 1">Hajime Tools</h2></span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <!-- <span class="md-list-item-text">Inbox</span> -->
            <router-link to="/" class="md-list-item-text">メモ</router-link>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

    </md-app>




<!--
    <md-toolbar class="md-container">
      <md-button class="md-icon-button" @click.native="$refs.sidenav.toggle()">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Hajime Tools</h2>

      <button class="md-button" v-if="!loginState" v-on:click="showLogin = true">ログイン</button>
      <button class="md-button" v-else v-on:click="logout()">ログアウト</button>

      <router-link to="/" class="md-button">メモ</router-link>
      <router-link to="/health" class="md-button">ケンコー</router-link>
      <router-link to="/house" class="md-button">カケイボ</router-link>
      <router-link to="/kpt" class="md-button">KPT</router-link>
      <router-link to="/video-player" class="md-button">Video</router-link>

    </md-toolbar>

    <md-sidenav class="md-left" ref="sidenav">
      <md-toolbar class="md-account-header">
        <h1>一覧</h1>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <md-avatar>
            <img src="https://irec.jp/images/upfile/icon-microphone01.png" alt="Memo">
          </md-avatar>
          <md-button>Voice Memo</md-button>
        </md-list-item>
        <md-list-item>
          <md-avatar>
            <img src="http://icon-rainbow.com/i/icon_03300/icon_033000_256.jpg" alt="Health">
          </md-avatar>
          <md-button>ケンコー</md-button>
        </md-list-item>
        <md-list-item>
          <md-avatar>
            <img src="http://iconhoihoi.oops.jp/sozai/icon/68-money2/icon_3g_192.png" alt="KAKEIBO">
          </md-avatar>
          <md-button>カケイボ</md-button>
        </md-list-item>
        <md-list-item>
          <md-avatar>
            <img src="http://timekrei.tenda.co.jp/colume/images/columepic03.jpg" alt="Health">
          </md-avatar>
          <md-button>KPT</md-button>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <Modal v-if="showLogin" @close="showLogin = false">
      <h2 slot="header">Login</h2>
      <Login slot="body" ref="logincom" @sendAlert="setAlert" msg=""></Login>
      <div slot="footer">
        <md-button class="md-raised md-primary" @click="reflogin">ログインn</md-button>
        <md-button class="md-raised md-accent">シンキ サクセイ</md-button>
        <button class="md-button md-raised md-warn" v-on:click="showLogin = false">
          モドル
        </button>
      </div>
    </Modal>

      <md-button class="md-primary md-raised" v-on:click="showSnackbar = true">動かない</md-button>
      {{showSnackbar}}
      <md-snackbar :md-position="position" :md-duration="Infinity" :md-active.sync="showSnackbar" md-persistent>
        <span>こちらはテスト入力</span>
        <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
      </md-snackbar>
-->
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import Login from '@/components/Login'
import firebase from 'firebase'
export default {
  name: 'header',
  components: {
    Modal,
    Login
  },
  data: () => ({
    menuVisible: false,
    showLogin: false,
    loginState: false,
    message: 'test comment',
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false
  }),
  methods: {
    open (which, e) {
      e.preventDefault()
      if (Modal.active !== null) {
        document.getelementbyid('form-' + Modal.active).removeClass('active')
        document.getelementbyid(Modal.active + '-form').removeClass('active')
      }
      document.getelementbyid('login-modal').addClass('active')
      document.getelementbyid('form-' + which).addClass('active')
      document.getelementbyid(which + '-form').addClass('active')
      Modal.active = which
    },
    setAlert (msg) {
      this.message = msg
      this.activeAlert = true
      console.log('wored!!')
    },
    reflogin () {
      this.$refs.logincom.login()
      this.showLogin = false
    },
    logout () {
      var alertFunc = this.setAlert
      firebase.auth().signOut().then(function () {
        alertFunc('ログアウトに成功しました')
      }).catch(function (error) {
        alertFunc('ログアウトに失敗しました。ERROR_CODE:' + error.code)
      })
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loginState = true
      } else {
        this.loginState = false
      }
    })
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  color: #42b983 !important;
}
</style>
