<template>
  <div id="app">
    <Header></Header>
    <div class="main-content">
      <router-view></router-view>
      <button id="showModal" @click="showModal = true">login</button>
      <Login v-if="showModal" @close="showModal = false"></Login>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import Login from '@/components/login'
export default {
  name: 'app',
  components: {
    Header,
    Login
  }
}
</script>

<style>
@font-face {
	font-family: 'Project Paintball';
	src: url($font_path + 'Paintball_Beta_3.ttf');
}
@font-face {
	font-family: 'ikmodoki';
	src: url($font_path + 'ikamodoki1_0.ttf');
}
#app {
  font-family: 'Project Paintball', 'Project Paintball', "ikamodoki", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
}
.main-content {
  padding: 16px;
}
</style>
