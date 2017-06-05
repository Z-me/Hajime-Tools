<template>
  <div class="KPT">
    <h1>KPT</h1>
    <VoiceInput></VoiceInput>
  </div>
</template>

<script>
import VoiceInput from '@/components/voice_input'
export default {
  name: 'KPT',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    VoiceInput
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
