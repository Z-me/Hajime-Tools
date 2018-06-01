<template>
  <div class="HouseHold">
    <h1>カケイボ</h1>
    <VoiceInput></VoiceInput>
    <pre>{{ costData }}</pre>
  </div>
</template>

<script>
import VoiceInput from '@/components/Voice_input'
import firebase from 'firebase'
import firebaseConf from '../.firebaseEnv.json'

export default {
  name: 'HouseHold',
  data: () => ({
    fireDB: '',
    costDB: '',
    costData: []
  }),
  components: {
    VoiceInput
  },
  methods: {
    syncFirebase () {
      this.costDB = this.fireDB.database().ref('costs')
      let list = []
      this.costDB.on('value', function (fbdata) {
        console.log('fvdata', fbdata.val())
        list.push(fbdata.val())
      })
      this.costData = list
    }
  },
  created () {
    this.fireDB = !firebase.app.length ? firebase.initializeApp(firebaseConf) : firebase.app()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.syncFirebase()
      } else {
        alert('ログインしてね♪')
      }
    })
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
