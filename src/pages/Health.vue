<template>
  <div class="Health">
    <h1>タイジューケー</h1>
    <VoiceInput></VoiceInput>
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>ニュウリョク</label>
        <md-textarea v-model="pushData"></md-textarea>
      </md-input-container>
    </form>
    {{pushData}}
    <md-button class="md-raised md-primary" v-on:click.native="pushData">トーロク</md-button>
    <vue-chart type="line" :data="chartData"></vue-chart>
    <Video></Video>
  </div>
</template>

<script>
import VoiceInput from '@/components/Voice_input'
import Firebase from 'firebase'
import Video from '@/components/Video'
import VueChart from 'vue-chart-js'
export default {
  name: 'Health',
  data () {
    return {
      chartData: {
        labels: ['Item 1', 'Item 2', 'Item 3'],
        datasets: [
          {
            label: 'Component 1',
            data: [10, 20, 30]
          },
          {
            label: 'Component 2',
            data: [20, 30, 40]
          }
        ]
      },
      weightDB: {},
      Date: '',
      pushData: '1234'
    }
  },
  components: {
    VoiceInput,
    Video,
    VueChart
  },
  methods: {
    pushData: function (event) {
      alert('aaaaaa')
//      let DB = new Firebase('https://hajime-tools.firebaseio.com')
//      let weightDB = DB.child('weight')
      this.pushdata.id = this.Date
      this.weightDB.push(this.pushData)
    }
  },
  mounted () {
    this.$nextTick(function () {
      let DB = new Firebase('https://hajime-tools.firebaseio.com')
      this.weightDB = DB.child('weight')
      this.Date = new Date()
      this.weightDB.on('child_added', (datas) => {
        let data = datas.val()
        data.id = datas.key()
        this.items.unshift(data)
        console.log(data)
      })
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
