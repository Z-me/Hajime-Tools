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
	font-family: 'Project Paintball' !important;
	src: url($font_path + 'Paintball_Beta_3.ttf');
}
@font-face {
	font-family: 'ikmodoki' !important;
	src: url($font_path + 'ikamodoki1_0.ttf');
}
#app {
  font-family: 'Project Paintball', 'Project Paintball', "ikamodoki", sans-serif;
  src: url($font_path + 'Paintball_Beta_3.ttf');
  src: url($font_path + 'ikamodoki1_0.ttf');
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
}
.main-content {
  padding: 16px;
}
</style>
