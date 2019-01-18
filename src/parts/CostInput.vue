<template>
  <v-layout row justify-center>
    <v-dialog v-model="openInput" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="indigo">
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>新規登録</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="checkSaveData">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout wrap justify-space-around>
            <template v-for="(item, key) in input">
              <v-flex xs12 sm12 md1 offset-sm1 offset-md1>
                <h3>{{`【${Number(key) + 1}】`}}</h3>
              </v-flex>
              <v-flex xs12 sm6 md2>
                <v-menu
                  ref="dateInput"
                  v-model="item.showDate"
                  :close-on-content-click="false"
                  full-width
                  max-width="290"
                  >
                  <v-text-field
                    v-model="item.dateTmp"
                    slot="activator"
                    :value="computedDataFormat"
                    clearable
                    append-icon="event"
                    label="支払日"
                    box
                    :rules="[rules.required]"
                    readonly
                    ></v-text-field>
                  <v-date-picker
                    color='indigo'
                    v-model="item.dateTmp"
                    @change="setDateInput(item, key)"
                    >
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md2>
                <v-select
                  :items="types"
                  item-text="label"
                  item-value="val"
                  label="購入種別"
                  v-model="item.type"
                  box
							    bottom
                  :rules="[rules.required]"
                  clearable
                ></v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md2>
                <v-text-field
                  v-model="item.cost"
                  type="number"
                  min="0"
                  box
                  :rules="[rules.required, rules.cost]"
                  label="価格"
                  append-icon="¥"
                  clearable
                  ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm6 md2>
                <v-select
                  :items="payments"
                  label="購入者"
                  v-model="item.payment"
                  box
                  :rules="[rules.required]"
                  clearable
                ></v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex sx12 sm1 dm1>
                <v-btn icon dark small feb
                  v-show="input.length > 1"
                  @click="deleteInput(key)"
                  color="pink darken-1"
                  >
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-btn icon dark small feb
                  v-show="Number(key) + 1 == input.length"
                  @click="addInput"
                  color="teal accent-4"
                  >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-flex>
            </template>
          </v-layout>

          <modal :show="modalView.save" modalColor="blue lighten-1">
            <div slot="title">保存データ確認</div>
            <div slot="contents">
              {{`${input.length}個のデータを保存します`}}
            </div>
            <div slot="action">
              <v-btn color="teal accent-4" flat @click="saveData">OK</v-btn>
              <v-btn color="pink darken-1" flat @click="modalView.save = false">キャンセル</v-btn>
            </div>
          </modal>

          <modal :show="modalView.error" modalColor="pink darken-1">
            <div slot="title">入力エラー</div>
            <div slot="contents">
              <h2>{{`${inputError.length}個のデータに入力ミスがあります`}}</h2>
              <v-layout wrap align-center>
                <v-flex sx3 sm3 md3><h4>【対象ID】</h4></v-flex>
                <v-flex sx9 sm9 md9><h4>【エラー内容】</h4></v-flex>
                <template v-for="(item, key) in inputError">
                  <v-flex sx3 sm3 md3><h4>{{`【${Number(item.key) + 1}】`}}</h4></v-flex>
                  <v-flex sx9 sm9 md9><p>{{item.message}}</p></v-flex>
                  <v-flex sx12 sm12 md12>
                    <v-divider
                      inset
                      :key="key"
                      class="grey--text text--lighten-4"
                    ></v-divider>
                  </v-flex>
                </template>
              </v-layout>
            </div>
            <div slot="action">
              <v-btn color="teal accent-4" round flat @click="modalView.error = false">閉じる</v-btn>
            </div>
          </modal>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import firebaseConf from '../.firebaseEnv.json'
import Auth from '@/lib/Auth'
import Modal from '@/components/Modal'
import customSelect from 'vue-multiselect'

export default {
  name: 'TableSearch',
  data: () => ({
    Auth: null,
    fireDB: null,
    costDB: null,
    input: [],
    inputError: [],
    rules: {
      required: value => !!value || '必須入力です',
      cost: value => {
        return Math.round(value) === Number(value) && value > 0 || '0より大きい整数を入力してください'
      }
    },
    types: [
      {'val': 'utility', 'label': '光熱費'},
      {'val': 'foods', 'label': '食費'},
      {'val': 'Sundries', 'label': '雑貨'},
      {'val': 'rent', 'label': '家賃'}
    ],
    payments: [
      'Hajime',
      'Shiori'
    ],
    dataConst: {
      'date': moment(new Date()).format('YYYY-MM-DD'),
      'showDate': false,
      'dateTmp': moment(new Date()).format('YYYY-MM-DD'),
      'cost': null,
      'type': 'foods'
    },
    modalView: {
      'save': false,
      'error': false
    }
  }),
  props: [
    'openInput'
  ],
  components: {
    Modal,
    customSelect
  },
  methods: {
    async setPayment () {
      this.Auth = await new Auth()
      if (this.Auth.isLoading) {
        setTimeout(() => {
          this.Auth.getUser().then((res) => {
            this.dataConst.payment = res.user
            this.input[0].payment = res.user
          })
        }, 3000)
      } else {
        this.Auth.getUser().then((res) => {
          this.dataConst.payment = res.user
          this.input[0].payment = res.user
        })
      }
    },
    checkSaveData () {
      let result = true
      let error = []
      let typeList = this.types.map((obj) => {
        return obj.val
      })
      if (!this.input.length) result = false
      this.input.forEach((obj, key) => {
        if (!obj.date) {
          error.push({'key': key, 'message': '支払日の値が入力されていません'})
          result = false
        }
        if (!moment(obj.date).isSameOrBefore(moment(new Date()))) {
          error.push({'key': key, 'message': '支払日は本日を含む過去のデータのみ登録できます'})
          result = false
        }
        if (!obj.type) {
          error.push({'key': key, 'message': '購入種別が入力されていません'})
          result = false
        }
        if (!(typeList.includes(obj.type))) {
          error.push({'key': key, 'message': '未知の購入種別が指定されています'})
          result = false
        }
        if (!obj.cost) {
          error.push({'key': key, 'message': '金額が入力されていません'})
          result = false
        }
        if (!obj.payment) {
          error.push({'key': key, 'message': '購入者が入力されていません'})
          result = false
        }
      })
      if (result) {
        this.modalView.save = true
      } else {
        this.inputError = error
        this.modalView.error = true
      }
    },
    setDateInput (item, key) {
      this.input[key].date = String(this.input[key].dateTmp)
      this.input[key].showDate = false
    },
    async saveData () {
      await this.input.forEach((data) => {
        delete data.showDate
        delete data.dateTmp
        this.costDB.push(data)
        console.log('Saved Data:', data)
      })
      this.modalView.save = false
      this.close()
    },
    close () {
      this.input = []
      this.addInput()
      this.$emit('close')
    },
    addInput () {
      this.input.push(Object.assign({}, this.dataConst))
    },
    deleteInput (index) {
      this.input.splice(index, 1)
    }
  },
  computed: {
    computedDataFormat () {
      return this.dataConst.date ? moment(this.dataConst.date).format('YYYY-MM-DD') : ''
    }
  },
  mounted () {
    this.setPayment()
    this.addInput()
    this.fireDB = !firebase.app.length ? firebase.initializeApp(firebaseConf) : firebase.app()
    this.costDB = this.fireDB.database().ref('costs')
  }
}
</script>

<style scoped>
</style>
