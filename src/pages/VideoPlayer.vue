<template>
  <div class="VideoPlayer">
    <h1>ビデオプレーヤー</h1>
    <Video></Video>
  </div>
</template>

<script>
import Video from '@/components/Video'

export default {
  name: 'VideoPlayer',
  data () {
    return {
      msg: 'aaa'
    }
  },
  components: {
    Video
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
