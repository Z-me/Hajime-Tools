<template>
  <div id="app">
    <Header></Header>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
@font-face {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  src: url($font_path +'Splatfont2.ttf') format('ttf');
  font-style     : normal;
  font-weight    : 400;
  text-rendering : optimizeLegibility;
}
#app {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  font-style     : normal;
  font-weight    : 400;
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
