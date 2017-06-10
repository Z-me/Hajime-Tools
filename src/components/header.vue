<template>
  <div id="header">
    <md-toolbar class="md-container">
      <md-button class="md-icon-button" @click.native="$refs.sidenav.toggle()">
        <md-icon>menu</md-icon>
      </md-button>
      
      <h2 class="md-title" style="flex: 1">Hajime Tools</h2>
      
      <button class="md-button" v-on:click="showLogin = true">LOGIN</button>
      
      <router-link to="/" class="md-button">メモ</router-link>
      <router-link to="/minecraft" class="md-button">マイクラ</router-link>
      <router-link to="/house" class="md-button">カケイボ</router-link>
      <router-link to="/kpt" class="md-button">KPT</router-link>
    </md-toolbar>
    
    <md-sidenav class="md-left" ref="sidenav">
      <md-toolbar class="md-account-header">
        <h1>一覧</h1>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <md-avatar>
            <img src="https://irec.jp/images/upfile/icon-microphone01.png" alt="People">
          </md-avatar>
          <md-button>Voice Memo</md-button>
        </md-list-item>
        <md-list-item>
          <md-avatar>
            <img src="http://is1.mzstatic.com/image/thumb/Purple127/v4/97/59/5f/97595f13-e668-dcc5-69df-441c4d798a91/source/1200x630bb.jpg" alt="People">
          </md-avatar>
          <md-button>Minecraft</md-button>
        </md-list-item>
      </md-list>
    </md-sidenav>
    
    <Modal v-if="showLogin" @close="showLogin = false">
      <h2 slot="header">Login</h2>
      <Login slot="body"></Login>
      <div slot="footer">
        <md-button class="md-raised md-primary">Login</md-button>
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
