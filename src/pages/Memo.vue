<template>
  <div class="memo">
    <h1>音声入力メモ</h1>
    <voice-input :voiceInput.sync="voiceInput"></voice-input>
    <h2>「{{ voiceInput.message }}」</h2>
  </div>
</template>

<script>
import VoiceInput from '@/parts/VoiceInput'
export default {
  name: 'hello',
  data: () => ({
    voiceInput: {
      message: ''
    }
  }),
  components: {
    VoiceInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
