<template>
  <div class="Health">
    <h1>タイジューケー</h1>
    <md-field>
      <label>ニュウリョク</label>
      <md-input v-model="weight" type="number" min='0'></md-input>
    </md-field>
    <md-button class="md-raised md-primary" @click="pushData()">トーロク</md-button>
    <vue-chart type="line" :data="chartData"></vue-chart>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseConf from '../.firebaseEnv.json'
import VueChart from 'vue-chart-js'
export default {
  name: 'Health',
  data: () => ({
    chartData: {
      labels: ['Item 1', 'Item 2', 'Item 3'],
      datasets: [
        {
          label: 'Component 1',
          backgroundColor: 'rgb(114, 213, 207)',
          data: [15, 20, 30]
        },
        {
          label: 'Component 2',
          backgroundColor: 'rgb(238, 86, 86)',
          data: [20, 30, 40]
        }
      ]
    },
    fireDB: '',
    weightDB: {},
    weightData: {},
    today: '',
    weight: '',
    hoge: ''
  }),
  components: {
    VueChart
  },
  methods: {
    pushData (event) {
      let weightObj = {
        date: this.today,
        weight: Number(this.weight)
      }
      this.hoge = weightObj
      this.weightDB.push(weightObj)
    },
    syncFirebase () {
      let listObj = []
      this.weightDB.on('child_added', function (fbdata) {
        listObj.push(fbdata.val())
      })
      this.weightData = listObj
    },
    setDate (now) {
      let month = (now.getMonth() + 1 > 9 ? '' : '0') + (now.getMonth() + 1)
      let date = (now.getDate() > 9 ? '' : '0') + now.getDate()
      this.today = now.getFullYear() + '-' + month + '-' + date
    }
  },
  created () {
    // set Firebase env
    const that = this
    this.fireDB = !firebase.app.length ? firebase.initializeApp(firebaseConf) : firebase.app()
    this.weightDB = this.fireDB.database().ref('weights')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.syncFirebase()
      } else {
        alert('ログインしてね♪')
        that.$router.push('/')
      }
    })
    // set date
    let now = new Date()
    this.setDate(now)
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
