<template lang="html">
  <div class="md-layout md-gutter md-alignment-center result-field">
    <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
      <h3 class="center">全体支払割合</h3>
      <DoughnutChart :width="210" :height="70" :chart-data="allGenreDonuts"></DoughnutChart>
      <h1 class="center">{{totalCost | en}}</h1>
    </div>
    <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
      <h3 class="center">支払い者割合</h3>
      <HolizontalBar :width="210" :height="70" :chart-data="paymentRate"></HolizontalBar>
    </div>

    <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
      <h3 class="center">支出日グラフ</h3>
      <LineChart :width="420" :height="70" :chart-data="dailyCosts"></LineChart>
    </div>
    <div class="md-layout-item md-xlarge-size-45 md-large-size-45 md-medium-size-45 md-small-size-45 md-xsmall-size-100">
      <h1 class="center">Hajime</h1>
      <h3 class="center">支出者別支払割合</h3>
      <DoughnutChart :width="210" :height="100" :chart-data="paymentCosts_Hajime"></DoughnutChart>
      <h1 class="center">{{totalCosts.Hajime | en}}</h1>
    </div>
    <div class="md-layout-item md-xlarge-size-10 md-large-size-10 md-medium-size-10 md-small-size-10 md-xsmall-size-100">
      <img src="../assets/h2s.png" v-if="shareCosts < 0">
      <h2 class="center">{{Math.abs(shareCosts) | en}}</h2>
      <img src="../assets/s2h.png" v-if="shareCosts > 0">
    </div>
    <div class="md-layout-item md-xlarge-size-45 md-large-size-45 md-medium-size-45 md-small-size-45 md-xsmall-size-100">
      <h1 class="center">Shiori</h1>
      <h3 class="center">支出者別支払割合(Shiori)</h3>
      <DoughnutChart :width="210" :height="100" :chart-data="paymentCosts_Shiori"></DoughnutChart>
      <h1 class="center">{{totalCosts.Shiori | en}}</h1>
    </div>
  </div>
</template>

<script>
const colorList = [
  'rgba(186, 0, 0, 0.5)',
  'rgba(129, 255, 4, 0.5)',
  'rgba(255, 0, 0, 0.5)',
  'rgba(109, 0, 180, 0.5)',
  'rgba(0, 56, 255, 0.5)',
  'rgba(255, 252, 0, 0.5)',
  'rgba(0, 0, 0, 0.5)',
  'rgba(181, 31, 255, 0.5)',
  'rgba(129, 176, 152, 0.5)',
  'rgba(47, 105, 65, 0.5)'
]

import DoughnutChart from '../lib/charts/doughnutChart.js'
import LineChart from '../lib/charts/lineChart.js'
import HolizontalBar from '../lib/charts/holizontalBarChart.js'
import CalcChart from '../lib/charts/calcChart.js'
const calc = new CalcChart()

export default {
  name: 'Chart',
  data: () => ({
    type_list: null,
    allGenreDonuts: null,
    paymentRate: null,
    paymentCosts_Hajime: null,
    paymentCosts_Shiori: null,
    totalCosts: []
  }),
  props: [
    'data'
  ],
  components: {
    DoughnutChart,
    LineChart,
    HolizontalBar
  },
  filters: {
    en: function (val) {
      return '¥ ' + val.toLocaleString()
    }
  },
  methods: {
    checkObjectValueExist (arr, key, val) {
      return arr.some(function (arrVal) {
        return val === arrVal[key]
      })
    },
    setDayObj () {
      let obj = {}
      let data = this.data
      for (let key in data) {
        let dates = data[key].date
        let date = dates.split('-')
        if (date[0] in obj) {
          if (!(this.checkObjectValueExist(obj[date[0]], 'date', date[1]))) {
            obj[date[0]].push({
              date: date[1],
              value: date[0] + '-' + date[1]
            })
          }
        } else {
          obj[date[0]] = [{
            date: date[1],
            value: date[0] + '-' + date[1]
          }]
        }
      }
      this.dayObj = obj
    },
    getDateString (year, month, day) {
      return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
    },
    createCalcResult () {
      let data = Object.assign({}, this.data)
      let costs = {
        Hajime: 0,
        Shiori: 0
      }
      for (let key in data) {
        costs[data[key].payment] += Math.round(Number(data[key].cost) / 2)
        if (data[key].type === 'rent') {
          costs[data[key].payment] -= 30000
        }
      }
      this.shareCosts = costs.Hajime - costs.Shiori
      return null
    },
    fillData () {
      this.setAllGenreDonuts()
      this.setPaymentRate()
      this.setDailyCosts()
      this.createCalcResult()
      this.setPaymentCosts('Hajime')
      this.setPaymentCosts('Shiori')
    },
    setAllGenreDonuts () {
      let labels = []
      let datas = {}
      let costs = 0
      let data = Object.assign({}, this.data)
      for (let key in data) {
        costs += Math.round(Number(data[key].cost))
        if (labels.indexOf(String(data[key].type)) < 0) {
          labels.push(data[key].type)
          datas[data[key].type] = Math.round(Number(data[key].cost))
        } else {
          datas[data[key].type] += Math.round(Number(data[key].cost))
        }
      }
      data = []
      for (let dkey in datas) {
        data.push(datas[dkey])
      }
      // console.log('allGenre', this.allGenreDonuts)
      this.totalCost = costs
      this.allGenreDonuts = {
        labels: labels,
        datasets: [{
          label: 'donuts',
          backgroundColor: colorList,
          data: data
        }]
      }
      return this.allGenreDonuts
    },
    setPaymentRate () {
      let data = Object.assign({}, this.data)
      let labels = []
      let datas = {}
      for (let key in data) {
        if (labels.indexOf(String(data[key].payment)) < 0) {
          labels.push(data[key].payment)
          datas[data[key].payment] = Math.round(Number(data[key].cost))
        } else {
          datas[data[key].payment] += Math.round(Number(data[key].cost))
        }
      }
      let result = Object.values(datas)
      // console.log('paymentRate', this.paymentRate)
      this.paymentRate = {
        labels: labels,
        datasets: [
          {
            label: 'Payment Rate',
            backgroundColor: colorList,
            data: result
          }
        ]
      }
      return this.paymentRate
    },
    setDailyCosts () {
      let data = Object.assign({}, this.data)
      let types = ['ALL']
      let days = []
      let datas = {
        'ALL': []
      }
      Object.keys(data).forEach(function (k) {
        days.push(data[k].date)
      })
      let dayRange = days.filter(function (x, i, self) {
        return self.indexOf(x) === i
      })
      dayRange = Object.assign([], calc.sortFunc(dayRange))
      let startDate = dayRange[0]
      let endDate = dayRange[dayRange.length - 1]
      dayRange = Object.assign([], calc.getAllDay(startDate, endDate))
      dayRange = Object.assign([], calc.sortFunc(dayRange))
      for (let key in data) {
        if (types.indexOf(String(data[key].type)) < 0) {
          types.push(data[key].type)
          datas[data[key].type] = []
        }
      }
      for (let i = 0; i < dayRange.length; i++) {
        for (let j = 0; j < types.length; j++) {
          let cost = 0
          for (let key in data) {
            if (dayRange[i] === data[key].date && types[j] === data[key].type) {
              cost += Number(data[key].cost)
            }
          }
          datas[types[j]].push(cost)
        }
      }
      let all = []
      for (let i = 0; i < dayRange.length; i++) {
        let allCost = 0
        for (let j = 0; j < types.length; j++) {
          allCost += datas[types[j]][i]
        }
        all.push(allCost)
      }
      datas.ALL = Object.assign([], all)
      let datasets = []
      for (let i in types) {
        let dataset = {
          label: types[i],
          backgroundColor: colorList[i],
          data: datas[types[i]]
        }
        datasets.push(dataset)
      }
      this.dailyCosts = {
        labels: dayRange,
        datasets: datasets
      }

      // console.log('dailyCosts', this.dailyCosts)
      return datasets
    },
    setPaymentCosts (payment) {
      let data = Object.assign({}, this.data)
      let types = []
      let datas = []
      let costs = 0
      for (let key in data) {
        if (String(data[key].payment) === payment) {
          costs += Math.round(Number(data[key].cost))
          if (types.indexOf(String(data[key].type)) < 0) {
            types.push(data[key].type)
            datas[data[key].type] = Number(data[key].cost)
          } else {
            datas[data[key].type] += Number(data[key].cost)
          }
        }
      }
      // console.log('tyeps:_', types)
      // console.log('datas:_', datas)
      let result = {
        labels: types,
        datasets: [
          {
            label: payment + ' 支払い割合',
            backgroundColor: colorList,
            data: Object.values(datas)
          }
        ]
      }
      this.totalCosts[payment] = costs
      payment === 'Hajime' ? this.paymentCosts_Hajime = result : this.paymentCosts_Shiori = result
      return result
    }
  },
  created () {
    this.this.dayObj = calc.setDayObj(this.data)
    this.fillData()
  },
  watch: {
    data: function () {
      this.fillData()
    }
  }
}
</script>

<style lang="css">
.center {
  text-align: center !important;
}
</style>
