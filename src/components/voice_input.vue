<template>
  <div id="voice_input">
    <div>
      <form novalidate @submit.stop.prevent="submit">
        <md-input-container>
          <label>ニュウリョク</label>
          <md-textarea v-model="input"></md-textarea>
        </md-input-container>
      </form>
      <h2>Input sentence is " {{input}} "</h2>
    </div>
    <div>
      <md-button class="md-raised md-primary" v-on:click.native="startInput">Mic input</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'voice_input',
  data () {
    return {
      nowRecognition: '',
      input: ''
    }
  },
  created () {
    let recognition = new window.SpeechRecognition()
    recognition.lang = 'ja-JP'
    var nowRecognition = false
    recognition.contiruous = true
    recognition.interimResults = true
    if (!nowRecognition) {
      recognition.start()
      nowRecognition = true
    }
  },
  methods: {
    startInput: function () {
      alert('function!!')
    }
  }
}

</script>

<style scoped>
  
</style>
