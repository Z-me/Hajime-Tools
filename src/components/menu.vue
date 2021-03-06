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
          v-if="!isLogin"
          @click="showLogin = true"
          >
          <v-icon>assignment_ind</v-icon>
          ログイン
        </v-btn>

        <v-toolbar-title v-else-if="isLogin"><h3>{{`${user.user} [${user.email}]`}}</h3></v-toolbar-title>
        <v-btn
          small
          round
          color="pink darken-1"
          v-if="isLogin"
          @click="showLogout = true"
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
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </div>

    <modal :show="showLogin" modalColor="blue lighten-1">
      <div slot="title">ログイン</div>
      <login slot="contents" :auth.sync="newAuth"></login>
      <div slot="action">
        <v-btn color="teal accent-4" flat @click="login">ログイン</v-btn>
        <v-btn color="pink darken-1" flat @click="showLogin = false">モドル</v-btn>
      </div>
    </modal>

    <modal :show="showLogout" modalColor="pink darken-1">
      <div slot="title">ログアウト</div>
      <div slot="contents">
        <h2>本当にHajime-Toolからログアウトしますか?</h2>
      </div>
      <div slot="action">
        <v-btn color="teal accent-4" flat @click="logout">ログアウト</v-btn>
        <v-btn color="pink darken-1" flat @click="showLogout = false">キャンセル</v-btn>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import Login from '@/parts/login'
import Auth from '@/lib/Auth'
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
    user: {},
    isLogin: false,
    newAuth: {
      'mail': '',
      'password': ''
    },
    authUser: '',
    authIsLogin: false,
    authLoading: true,
    loginState: false,
    // showSnackbar: false,
    position: 'center',
    duration: 4000,
    isInfinity: false
  }),
  methods: {
    async login () {
      if (await this.Auth.login(this.newAuth.mail, this.newAuth.password)) {
        this.showSnackbar('success', 'ログインに成功しました')
        this.showLogin = false
        this.setAuthInfo()
      } else {
        this.showSnackbar('error', 'ログインに失敗しました')
      }
      this.newAuth = {
        'mail': '',
        'password': ''
      }
    },
    async logout () {
      if (await this.Auth.logout()) {
        this.showSnackbar('success', 'ログアウトしました')
        this.showLogout = false
        this.setAuthInfo()
      } else {
        this.showSnackbar('error', 'ログアウトに失敗しました')
      }
    },
    async setAuthInfo () {
      this.Auth = await new Auth()
      if (this.Auth.isLoading) {
        setTimeout(() => {
          this.Auth.getUser().then((res) => {
            // console.log('call GetUser on menue', res)
            this.user = res
            this.isLogin = Boolean(res)
            this.authLoading = false
          })
        }, 3000)
      } else {
        this.Auth.getUser().then((res) => {
          this.user = res
          this.isLogin = Boolean(res)
          this.authLoading = false
        })
      }
      return
    },
    showMenueItem (authShow) {
      return authShow ? this.isLogin : true
    },
    showSnackbar (type, message) {
      this.$emit('snack', type, message)
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
