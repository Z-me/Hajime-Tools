<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">家計簿リスト</h1>

          <body>
            <slot name="body"></slot>
          </body>
          <md-button @click="resetList" class="table-header-button">検索クリアー</md-button>
          <md-button @click="createCalcResult" class="table-header-button">計算開始</md-button>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">

          <md-select v-model="selectedDay" @input="searchOnTableDte" name="dateSelect" id="dateSelect" class="date-input-fealds" placeholder="日時指定">
            <template v-for="(year, index) in dayObj">
              <md-optgroup :label="index">
                <template v-for="date in year">
                  <md-option :value="date.value">{{date.date}}</md-option>
                </template>
              </md-optgroup>
            </template>
          </md-select>

          <md-input placeholder="支払い者検索" v-model="search" @input="searchOnTable" class="find"/>
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="検索結果ぜろー"
        :md-description="`'${search}' っていう検索条件に当てはまるデータはないっすねぇ`">
        <md-button class="md-primary md-raised" @click="newInput">情報追加</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="日付" md-sort-by="date">{{ item.date }}</md-table-cell>
        <md-table-cell md-label="種別" md-sort-by="type">{{ item.type }}</md-table-cell>
        <md-table-cell md-label="価格" md-sort-by="cost">{{ item.cost }}</md-table-cell>
        <md-table-cell md-label="支払い者" md-sort-by="payment">{{ item.payment }}</md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-layout md-gutter md-alignment-center result-field" v-if="chartData != null">
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <h3 class="center">全体支払割合</h3>
        <doughnut-chart :width="210" :height="70" :chart-data="allGenreDonuts"></doughnut-chart>
        <h1 class="center">¥ {{totalCost}}</h1>
      </div>
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <h3 class="center">支払い者割合</h3>
        <holizontal-bar :width="210" :height="70" :chart-data="paymentRate"></holizontal-bar>
      </div>

      <div class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <h3 class="center">支出日グラフ</h3>
        <line-chart :width="420" :height="70" :chart-data="dailyCosts"></line-chart>
      </div>
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <h3 class="center">支出者別支払割合(Hajime)</h3>
        <doughnut-chart :width="210" :height="100" :chart-data="getPaymentCosts('Hajime')"></doughnut-chart>
        <h1 class="center">¥ {{totalCosts.Hajime}}</h1>
      </div>
      <div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <h3 class="center">支出者別支払割合(Shiori)</h3>
        <doughnut-chart :width="210" :height="100" :chart-data="getPaymentCosts('Shiori')"></doughnut-chart>
        <h1 class="center">¥ {{totalCosts.Shiori}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase()
}
const searchByPayment = (items, term) => {
  if (term !== null) {
    return items.filter(item => toLower(item.payment).includes(toLower(term)))
  }
  return items
}
const searchByDate = (items, term) => {
  if (term !== null) {
    return items.filter(item => item.date.includes(term))
  }
  return items
}
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

import DoughnutChart from '../lib/doughnutChart.js'
import LineChart from '../lib/lineChart.js'
import HolizontalBar from '../lib/holizontalBarChart.js'
import PieChart from '../lib/polarChart.js'

export default {
  name: 'TableSearch',
  data: () => ({
    search: null,
    searched: [],
    dayObj: {},
    selectedDay: 'All Data in List',
    chartData: null,
    allGenreDonuts: null,
    paymentRate: null,
    dailyCosts: null,
    totalCost: 0,
    totalCosts: {}
  }),
  props: [
    'items'
  ],
  components: {
    DoughnutChart,
    LineChart,
    HolizontalBar,
    PieChart
  },
  methods: {
    newInput () {
      this.$emit('showInputModal')
    },
    searchOnTable () {
      this.searched = searchByPayment(this.items, this.search)
    },
    searchOnTableDte () {
      this.searchOnTable()
      this.searched = searchByDate(this.searched, this.selectedDay)
    },
    resetList () {
      this.selectedDay = null
      this.search = []
      this.searchOnTable()
    },
    checkObjectValueExist (arr, key, val) {
      return arr.some(function (arrVal) {
        return val === arrVal[key]
      })
    },
    setDayObj () {
      let obj = {}
      let data = this.searched
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
    sortFunc (arr) {
      arr.sort(function (a, b) {
        if (a < b) return -1
        if (a > b) return 1
        return 0
      })
      return arr
    },
    validDate (y, m, d) {
      let dt = new Date(y, m - 1, d)
      return (dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d)
    },
    getAllDay (startDay, endDay) {
      let result = []
      let start = startDay.slice(0, 7) + '-01'
      let endDate = [
        endDay.slice(0, 4),
        endDay.slice(5, 7)
      ]
      let end = null
      if (this.validDate(Number(endDate[0]), Number(endDate[1]), 31)) {
        end = endDay.slice(0, 7) + '-31'
      } else if (this.validDate(Number(endDate[0]), Number(endDate[1]), 30)) {
        end = endDay.slice(0, 7) + '-30'
      } else if (this.validDate(Number(endDate[0]), Number(endDate[1]), 29)) {
        end = endDay.slice(0, 7) + '-29'
      } else {
        end = endDay.slice(0, 7) + '-28'
      }
      let inputObj = {
        year: Number(start.slice(0, 4)),
        month: Number(start.slice(5, 7)),
        day: Number(start.slice(8, 10))
      }
      let endObj = {
        year: Number(end.slice(0, 4)),
        month: Number(end.slice(5, 7)),
        day: Number(end.slice(8, 10))
      }
      let dateFlag = true
      while (dateFlag) {
        if (this.validDate(inputObj.year, inputObj.month, inputObj.day)) {
          result.push(this.getDateString(inputObj.year, inputObj.month, inputObj.day))
          inputObj.day++
        } else {
          if (this.validDate(inputObj.year, inputObj.month + 1, 1)) {
            result.push(this.getDateString(inputObj.year, inputObj.month + 1, 1))
            inputObj.month++
            inputObj.day = 2
          } else if (this.validDate(inputObj.year + 1, 1, 1)) {
            result.push(this.getDateString(inputObj.year + 1, 1, 1))
            inputObj.year++
            inputObj.month = 1
            inputObj.day = 2
          }
        }
        let input = new Date(inputObj.year, inputObj.month, inputObj.day)
        let end = new Date(endObj.year, endObj.month, endObj.day)
        if (input > end) {
          dateFlag = false
        }
      }
      return result
    },
    getDateString (year, month, day) {
      return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
    },
    createCalcResult () {
      return null
    },
    fillData () {
      this.chartData = {
        labels: ['item1', 'item2'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: colorList[0],
            data: [11, 14]
          },
          {
            label: 'Data Two',
            backgroundColor: colorList[1],
            data: [3, 20]
          }
        ]
      }
      this.setAllGenreDonuts()
      this.setPaymentRate()
      this.setDailyCosts()
    },
    setAllGenreDonuts () {
      let labels = []
      let datas = {}
      let costs = 0
      let data = Object.assign({}, this.searched)
      for (let key in data) {
        costs += Number(data[key].cost)
        if (labels.indexOf(String(data[key].type)) < 0) {
          labels.push(data[key].type)
          datas[data[key].type] = Number(data[key].cost)
        } else {
          datas[data[key].type] += Number(data[key].cost)
        }
      }
      data = []
      for (let dkey in datas) {
        data.push(datas[dkey])
      }
      this.allGenreDonuts = {
        labels: labels,
        datasets: [{
          label: 'donuts',
          backgroundColor: colorList,
          data: data
        }]
      }
      console.log('allGenre', this.allGenreDonuts)
      this.totalCost = costs
      return datas
    },
    setPaymentRate () {
      let data = Object.assign({}, this.searched)
      let labels = []
      let datas = {}
      for (let key in data) {
        if (labels.indexOf(String(data[key].payment)) < 0) {
          labels.push(data[key].payment)
          datas[data[key].payment] = Number(data[key].cost)
        } else {
          datas[data[key].payment] += Number(data[key].cost)
        }
      }
      let result = Object.values(datas)
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

      console.log('paymentRate', this.paymentRate)
      return datas
    },
    setDailyCosts () {
      let data = Object.assign({}, this.searched)
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
      dayRange = Object.assign([], this.sortFunc(dayRange))
      let startDate = dayRange[0]
      let endDate = dayRange[dayRange.length - 1]
      dayRange = Object.assign([], this.getAllDay(startDate, endDate))
      dayRange = Object.assign([], this.sortFunc(dayRange))
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

      console.log('dailyCosts', this.dailyCosts)
      return datasets
    },
    getPaymentCosts (payment) {
      let data = Object.assign({}, this.searched)
      let types = []
      let datas = []
      let costs = 0
      for (let key in data) {
        if (String(data[key].payment) === payment) {
          costs += Number(data[key].cost)
          if (types.indexOf(String(data[key].type)) < 0) {
            types.push(data[key].type)
            datas[data[key].type] = Number(data[key].cost)
          } else {
            datas[data[key].type] += Number(data[key].cost)
          }
        }
      }
      console.log('tyeps:_', types)
      console.log('datas:_', datas)
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
      return result
    }
  },
  created () {
    this.searched = this.items
    this.setDayObj()
    this.fillData()
  },
  watch: {
    items: function () {
      this.searched = this.items
      this.setDayObj()
    },
    searched: function () {
      this.fillData()
    }
  }
}
</script>

<style scoped>
.md-field {
  max-width: 300px;
}
.find {
  color: #FFF;
  font-size: 1.5vw;
}
.find::placeholder {
  color: #FFF;
  font-size: 1.5vw;
}
.table-header-button {
  color: #FFF !important;
}
.center {
  text-align: center !important;
}
</style>
