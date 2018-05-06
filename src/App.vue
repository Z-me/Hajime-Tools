<template>
  <div id="app">
    <appHeader></appHeader>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/header'
export default {
  name: 'app',
  components: {
    appHeader
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
  margin: 0px;
}
.main-content {
  padding: 16px;
}
</style>
