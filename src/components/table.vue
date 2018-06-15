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
      <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <p>全体支払割合</p>
        <doughnut-chart :width="210" :height="70" :chart-data="allGenreDonuts"></doughnut-chart>
      </div>
      <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <p>支払い者割合</p>
        <holizontal-bar :width="210" :height="70" :chart-data="chartData"></holizontal-bar>
      </div>

      <div class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <p>支出日グラフ</p>
        <line-chart :width="420" :height="70" :chart-data="chartData"></line-chart>
      </div>
      <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <p>支出者別支払割合(Hajime)</p>
        <pie-chart :width="210" :height="100" :chart-data="chartData"></pie-chart>
      </div>
      <div class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
        <p>支出者別支払割合(Shiori)</p>
        <pie-chart :width="210" :height="100" :chart-data="chartData"></pie-chart>
      </div>
    </div>
    <pre>{{chartData}}</pre>
    <button @click="fillData()">Randomize</button>
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
    allGenreDonuts: null
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
      console.log(obj)
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
    },
    setAllGenreDonuts () {
      let labels = []
      let datas = {}
      let data = this.searched
      for (let key in data) {
        console.log('key', key)
        console.log('data', data[key])
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
      console.log(this.allGenreDonuts)
      return datas
    }
  },
  created () {
    this.searched = this.items
    this.setDayObj
  },
  watch: {
    items: function () {
      this.searched = this.items
      this.setDayObj()
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
</style>
