<template>
  <div id="app">
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

          <router-link to="/" class="md-button top-menu">メモ</router-link>
          <router-link to="/health" class="md-button top-menu">ケンコー</router-link>
          <router-link to="/house" class="md-button top-menu">カケイボ</router-link>
          <router-link to="/kpt" class="md-button top-menu">KPT</router-link>
          <router-link to="/video-player" class="md-button top-menu">Video</router-link>

        </div>

      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0"><Hajime-tools</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>record_voice_over</md-icon>
            <!-- <span class="md-list-item-text">Inbox</span> -->
            <router-link to="/" class="md-list-item-text top-menu">メモ</router-link>
          </md-list-item>

          <md-list-item>
            <md-icon>directions_run</md-icon>
            <router-link to="/health" class="md-list-item-text top-menu">ケンコー</router-link>
          </md-list-item>

          <md-list-item>
            <md-icon>attach_money</md-icon>
            <router-link to="/house" class="md-list-item-text top-menu">カケイボ</router-link>
          </md-list-item>

          <md-list-item>
            <md-icon>autorenew</md-icon>
            <router-link to="/kpt" class="md-list-item-text top-menu">KPT</router-link>
          </md-list-item>

          <md-list-item>
            <md-icon>local_movies</md-icon>
            <router-link to="/video-player" class="md-list-item-text top-menu">Video</router-link>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content class="viewing-contents">
        <router-view></router-view>
      </md-app-content>
    </md-app>

<!--
      <appHeader></appHeader>
      <router-view></router-view>
-->

    </div>
  </div>
</template>

<script>
import appHeader from '@/components/header'
export default {
  name: 'app',
  components: {
    appHeader
  },
  data: () => ({
    menuVisible: false
  })
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
</style>
