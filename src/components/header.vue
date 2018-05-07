<template>
  <div class="header">
    <md-toolbar class="md-container">
      <md-button class="md-icon-button" @click.native="$refs.sidenav.toggle()">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Hajime Tools</h2>

      <button class="md-button" v-on:click="showLogin = true">LOGIN</button>

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
      <Login slot="body" ref="logincom"></Login>
      <div slot="footer">
        <md-button class="md-raised md-primary" @click="reflogin">ログインn</md-button>
        <md-button class="md-raised md-accent">シンキ サクセイ</md-button>
        <button class="md-button md-raised md-warn" v-on:click="showLogin = false">
          モドル
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import Login from '@/components/Login'
export default {
  name: 'header',
  components: {
    Modal,
    Login
  },
  data () {
    return {
      showLogin: false
    }
  },
  methods: {
    open: function (which, e) {
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
    reflogin: function () {
      this.$refs.logincom.login()
    },
    reflogout: function () {
      this.$refs.logincom.logout()
    }
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  color: #42b983 !important;
}
</style>
