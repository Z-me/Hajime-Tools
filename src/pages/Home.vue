<template>
  <div class="home">
    <v-parallax
    :height="windowHeight"
    dark
    :src="require('../assets/HajimeToolsHome.jpg')"
    >
      <v-layout
        align-center
        column
        justify-center
        >
        <h1 class="hometitle">Hajime-Tools</h1>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    windowHeight: window.innerHeight
  }),
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight
      })
    })
  }
}
</script>

<style lang="css">
.hometitle {
  font-size: 8.0em;
  text-shadow: 5px 5px 2px blue;
}
</style>
