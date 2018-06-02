<template>
  <div class="HouseHold">
    <h1>カケイボ</h1>
    <VoiceInput></VoiceInput>
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
    costData: {}
  }),
  components: {
    VoiceInput
  },
  methods: {
    syncFirebase () {
      let listObj = []
      this.costDB.on('child_added', function (fbdata) {
        console.log('fvdata', fbdata.val())
        listObj.push(fbdata.val())
      })
      this.costData = listObj
    }
  },
  created () {
    this.fireDB = !firebase.app.length ? firebase.initializeApp(firebaseConf) : firebase.app()
    this.costDB = this.fireDB.database().ref('costs')
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
