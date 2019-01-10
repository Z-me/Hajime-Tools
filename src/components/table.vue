<template>
  <div>
    <v-card>
      <v-card-title>
        家計簿リスト
        <v-spacer></v-spacer>
        <v-btn
          dark
          round
          color="teal accent-4"
          @click="clearFilter">
          新規登録
        </v-btn>

        <v-text-field
          v-model="yearFilter"
          type="number"
          min="2017"
          label="日付フィルタ(年)"
          >
        </v-text-field>
        <v-text-field
          v-show="yearFilter"
          v-model="monthFilter"
          type="number"
          min="1"
          max="12"
          label="(月)"
          >
        </v-text-field>
        <v-text-field
          v-show="monthFilter"
          v-model="dayFilter"
          type="number"
          min="1"
          max="31"
          label="(日)"
          >
        </v-text-field>
        <v-btn
          v-if="yearFilter"
          dark
          color="pink darken-1"
          @click="clearFilter">
          Clear
        </v-btn>


      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="searched"
        :loading="isLoading"
        :pagination.sync="pagination"
        >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <td><h3>{{ setdateFormat(props.item.date) }}</h3></td>
          <td><h3>{{ setTypeJp(props.item.type) }}</h3></td>
          <td><h3>{{ props.item.cost | costFilter }}</h3></td>
          <td><h3>{{ props.item.payment }}</h3></td>
        </template>
      </v-data-table>
    </v-card>
    <chart :data='searched' :isLoading="isLoading"></chart>
  </div>
</template>

<script>
import Chart from '../components/homebookChart'
import moment from 'moment'
import Modal from './Modal'

const typeTable = {
  'utility': '光熱費',
  'foods': '食費',
  'Sundries': '雑貨',
  'rent': '家賃'
}

export default {
  name: 'TableSearch',
  data: () => ({
    headers: [
      {
        text: '日付',
        aligh: 'right',
        sortale: true,
        value: 'date'
      },
      {
        text: '種別',
        aligh: 'left',
        sortale: true,
        value: 'type'
      },
      {
        text: '価格',
        aligh: 'right',
        sortale: true,
        value: 'cost'
      },
      {
        text: '支払者',
        aligh: 'right',
        sortale: false,
        value: 'payment'
      }
    ],
    pagination: {
      sortBy: 'date',
      descending: true,
      rowsPerPage: 10
    },
    // search: null,
    yearFilter: '',
    monthFilter: '',
    dayFilter: '',
    searched: [],
    selectedDay: 'All Data in List'
  }),
  props: [
    'items'
  ],
  components: {
    Chart,
    Modal
  },
  filters: {
    costFilter: (value) => {
      let formatter = new Intl.NumberFormat('ja-JP')
      return `¥ ${formatter.format(value)}`
    }
  },
  methods: {
    getDateString (year, month, day) {
      return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
    },
    setdateFormat (date) {
      return moment(new Date(date)).format('YYYY年MM月DD日')
    },
    setTypeJp (type) {
      return typeTable[type]
    },
    clearFilter () {
      this.yearFilter = ''
      this.monthFilter = ''
      this.dayFilter = ''
      this.itemFilter()
    },
    itemFilter () {
      if (!this.yearFilter) {
        this.searched = this.items
        return
      }
      let inputFilter = this.yearFilter
      if (this.monthFilter) {
        inputFilter += `-${this.monthFilter}`
      }
      if (this.dayFilter) {
        inputFilter += `-${this.dayFilter}`
      }
      this.searched = this.items.filter((item) => {
        return item.date.indexOf(String(inputFilter)) > -1
      })
    }
  },
  created () {
    this.searched = this.items
    this.isLoading = true
  },
  watch: {
    items: function () {
      this.searched = this.items
      // this.itemFilter()
      this.isLoading = !(Object.keys(this.items).length > 0)
    },
    yearFilter: function () {
      if (!this.yearFilter) {
        this.monthFilter = ''
      }
      this.itemFilter()
    },
    monthFilter: function () {
      if (!this.monthFilter) {
        this.dayFilter = ''
      }
      this.itemFilter()
    },
    dayFilter: function () {
      this.itemFilter()
    }
  }
}
</script>

<style scoped>
</style>
