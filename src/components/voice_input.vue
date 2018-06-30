<template>
  <div id="voice_input">
    <div>
      <form novalidate @submit.stop.prevent="submit">
        <md-field>
          <label>ニュウリョク</label>
          <md-input v-model="input"></md-input> {{recognitionText}}
        </md-field>
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
  data: function () {
    return {
      input: '',
      recognition: new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)(),
      recognitionText: 'Start Voice Input'
    }
  },
  methods: {
    startInput: function () {
      this.recognition.start()
    }
  },
  created: function () {
    this.recognition.onstart = () => {
      this.recognitionText = 'ニュウリョクチュウ...'
    }
    this.recognition.onend = () => {
      this.recognitionText = 'Start Voice Input'
    }
    this.recognition.onresult = (event) => {
      if (event.results.length > 0) {
        this.input = event.results[0][0].transcript
      }
    }
  }
}

</script>

<style scoped>

</style>
