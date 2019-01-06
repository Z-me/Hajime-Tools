<template>
  <div class="vue-menu">
    <div
      class="hide-overflow"
      style="position: relative;">
      <v-toolbar
        absolute
        color="indigo"
        dark
        scroll-off-screen
        scroll-target="#main-container"
        >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title><h2 style="flex: 1">Hajime Tools</h2></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn
          :loading="authLoading"
          small
          round
          color="teal accent-4"
          v-if="!authIsLogin"
          @click="showLogin = true"
          >
          <v-icon>assignment_ind</v-icon>
          ログイン
        </v-btn>

        <v-toolbar-title v-else-if="authIsLogin">{{authEmail}}</v-toolbar-title>
        <v-btn
          small
          round
          color="pink darken-1"
          v-if="authIsLogin"
          @click="logout()"
          >
          <v-icon>directions_walk</v-icon>
          ログアウト
        </v-btn>
      </v-toolbar>
      <div
        id="scrolling-techniques"
        class="scroll-y"
        style="max-height: 100vh; padding-top: 60px !important;"
        >
        <v-container style="height: 100vh;">
          <slot name="main-container" id="main-container" style="max-height: 100vh;"></slot>
        </v-container>
      </div>
    </div>

    <div class="side-menu">
      <v-layout
        wrap
      >
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant="mini"
          absolute
          temporary
          >
          <v-list class="pa-1">
            <v-list-tile v-if="mini" @click.stop="mini = !mini">
              <v-list-tile-action>
                <v-icon>chevron_right</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img src="../assets/Kirby.png">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Hajime-Tools</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          <v-list class="pt-0" dense>
            <v-divider light></v-divider>

            <v-list-tile
              v-for="item in items"
              :key="item.title"
              @click=""
              >
              <v-list-tile-action v-if="showMenueItem(item.isAuth)">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content v-if="showMenueItem(item.isAuth)">
                <router-link :to="item.routers" tag="v-list-tile-title">{{ item.title }}</router-link>
                <!-- <v-list-tile-title>{{ item.title }}</v-list-tile-title> -->
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </div>

    <modal :show="showLogin">
      <div slot="title">ログイン</div>
      <login slot="contents" :auth.sync="newAuth"></login>
      <div slot="action">
        <v-btn color="teal accent-4" flat @click="login">ログイン</v-btn>
        <v-btn color="pink darken-1" flat>モドル</v-btn>
      </div>
    </modal>
    <modal :show="showLogout">
      <div slot="title">ログアウト</div>
      <div slot="contents">
        本当に
      </div>
      <div slot="action">
        <v-btn color="teal accent-4" flat @click="logout">ログアウト</v-btn>
        <v-btn color="pink darken-1" flat>キャンセル</v-btn>
      </div>
    </modal>
<!--
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
            <!-- <span class="md-list-item-text">Inbox</span> --
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
import Login from '@/parts/login'
import Auth from '@/lib/Auth'
// import firebase from 'firebase'
export default {
  name: 'vue-menu',
  components: {
    Modal,
    Login
  },
  data: () => ({
    menuVisible: false,
    drawer: null,
    items: [
      { title: 'Home', icon: 'home', routers: '/', isAuth: false },
      { title: '音声入力メモ', icon: 'mic', routers: '/memo', isAuth: true },
      { title: '健康チェク', icon: 'directions_walk', routers: '/helth', isAuth: true },
      { title: '家計簿', icon: 'attach_money', routers: '/house', isAuth: true },
      { title: 'KPT', icon: 'loop', routers: '/kpt', isAuth: true },
      { title: 'Video', icon: 'video_library', routers: '/video-player', isAuth: true }
    ],
    mini: false,
    right: null,
    showLogin: false,
    showLogout: false,
    Auth: null,
    newAuth: {
      'mail': '',
      'password': ''
    },
    authEmail: '',
    authIsLogin: false,
    authLoading: true,
    loginState: false,
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false
  }),
  methods: {
    /*
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
      // console.log('wored!!')
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
    } */
    async login () {
      if (await this.Auth.login(this.newAuth.mail, this.newAuth.password)) {
        this.showLogin = false
        this.setAuthInfo()
      }
      /*
      if (this.$emit('login', this.auth.mail, this.auth.password)) {
        this.showLogin = false
      } */
      this.newAuth = {
        'mail': '',
        'password': ''
      }
    },
    async logout () {
      if (await this.Auth.logout()) {
        this.setAuthInfo()
      }
      // this.$emit('logout')
    },
    async setAuthInfo () {
      this.Auth = await new Auth()
      setTimeout(() => {
        this.authEmail = this.Auth.getUser()
        this.authIsLogin = this.Auth.checkLogin()
        this.authLoading = false
      }, 1000)
    },
    showMenueItem (authShow) {
      return authShow ? this.authIsLogin : true
    }
  },
  mounted () {
    this.setAuthInfo()
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  color: #42b983 !important;
}
</style>
