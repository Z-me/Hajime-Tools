<template>
  <div id="voice_input">
    <v-text-field
      :label="recognitionText"
      v-model="voiceInput.message"></v-text-field>
    <v-btn dark icon color="cyan darken-2" @click.native="startInput">
      <v-icon>
        mic
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'voice_input',
  data: () => ({
    // input: '',
    recognition: new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)(),
    recognitionText: 'Start Voice Input'
  }),
  props: [
    'voiceInput'
  ],
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
        this.voiceInput.message = event.results[0][0].transcript
      }
    }
  }
}

</script>

<style scoped>

</style>
