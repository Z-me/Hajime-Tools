<template>
  <div class="HouseHold">
    <houseTable :items='costData' @showInputModal='showModal' @showEditModal='showEditModal'>
      <md-button slot="body" class="md-primary newInput" @click="showModal">新規追加</md-button>
    </houseTable>

    <Modal ref='modal'>
      <div class="md-title" slot="header">新規追加</div>

      <div class="md-layout md-gutter" slot="body">
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <md-table md-card class="input-table">

              <md-table-toolbar class="imput-table">
                <h1 class="md-title">入力情報</h1>
              </md-table-toolbar>

              <md-table-row>
                <md-table-head>日付</md-table-head>
                <md-table-head>種別</md-table-head>
                <md-table-head>価格</md-table-head>
                <md-table-head>支払い者</md-table-head>
              </md-table-row>

              <md-table-row v-for="item in newDatas" :key="item.id">
                <md-table-cell>
                  <md-datepicker v-model="item.date" :md-open-on-focus="false"/>
                </md-table-cell>

                <md-table-cell>
                  <md-select v-model="item.type" name="type" id="type">
                    <template v-for="type in types">
                      <md-option :value="type">{{type}}</md-option>
                    </template>
                  </md-select>
                </md-table-cell>

                <md-table-cell>
                  <md-input v-model="item.cost" type="number" min='0'></md-input>
                </md-table-cell>

                <md-table-cell>
                  <md-select v-model="item.payment" name="payment" id="payment">
                    <template v-for="payment in payments">
                      <md-option :value="payment">{{payment}}</md-option>
                    </template>
                  </md-select>
                </md-table-cell>
              </md-table-row>

            </md-table>
          </md-field>
        </div>
        <md-button class="md-icon-button md-primary" @click="pushNewData"><md-icon>add_circle</md-icon></md-button>
        <md-button class="md-icon-button md-accent" @click="popNewData"><md-icon>remove_circle</md-icon></md-button>
        <md-button class="md-raised md-primary" @click="addData">トーロク</md-button>
        <md-button class="md-raised" @click="closeModal">モドル</md-button>
      </div>

    </Modal>

    <Modal ref='editModal'>
      <div class="md-title" slot="header">変更</div>
      <div class="md-layout md-gutter margin100" slot="body">
        <form novalidate class="md-layout">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="Date">日付</label>
                <md-datepicker name='Date' v-model="editData.date" :md-open-on-focus="false"/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="type">種別</label>
                <md-select v-model="editData.type" name="type" id="type">
                  <template v-for="type in types">
                    <md-option :value="type">{{type}}</md-option>
                  </template>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="costs">価格</label>
                <md-input name='costs' v-model="editData.cost" type="number" min='0'></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="payment">支払い者</label>
                <md-select v-model="editData.payment" name="payment" id="payment">
                  <template v-for="payment in payments">
                    <md-option :value="payment">{{payment}}</md-option>
                  </template>
                </md-select>
              </md-field>
            </div>
          </div>
        </form>
        <div>
          <md-button class="md-raised md-primary" @click="saveData">コーシン</md-button>
          <md-button class="md-raised" @click="closeEditModal">モドル</md-button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import houseTable from '@/components/table'
import Modal from '@/components/Modal'
import firebase from 'firebase'
import firebaseConf from '../.firebaseEnv.json'

export default {
  name: 'HouseHold',
  data: () => ({
    fireDB: '',
    costDB: '',
    costData: {},
    newDatas: [],
    userEmail: '',
    editData: {},
    today: '',
    payments: [
      'Hajime',
      'Shiori'
    ],
    types: [
      'foods',
      'utility',
      'Sundries',
      'rent'
    ]
  }),
  components: {
    houseTable,
    Modal
  },
  computed: {
    userName () {
      if (!this.userEmail) return ''
      return this.userEmail.indexOf('3110') > 0 ? 'Hajime' : 'Shiori'
    }
  },
  methods: {
    async syncFirebase () {
      let listObj = []
      await this.costDB.on('child_added', (fbdata) => {
        let data = fbdata.val()
        data.fbKey = fbdata.key
        listObj.push(data)
      })
      this.costData = listObj
    },
    setDate (d) {
      let month = (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1)
      let date = (d.getDate() > 9 ? '' : '0') + d.getDate()
      return d.getFullYear() + '-' + month + '-' + date
    },
    showModal () {
      this.$refs.modal.modalControl(true)
    },
    showEditModal (item) {
      this.editData = Object.assign({}, item)
      this.$refs.editModal.modalControl(true)
    },
    closeModal () {
      this.$refs.modal.modalControl(false)
      this.newDatas = {}
    },
    closeEditModal () {
      this.$refs.editModal.modalControl(false)
    },
    pushNewData () {
      this.newDatas.push({
        date: this.today,
        cost: 0,
        payment: this.userName,
        type: 'foods'
      })
    },
    popNewData () {
      this.newDatas.pop()
    },
    addData () {
      let dataset = this.newDatas
      for (var key in dataset) {
        let tmpDate = new Date(Date.parse(dataset[key].date))
        dataset[key].date = this.setDate(tmpDate)
        this.costDB.push(dataset[key])
      }
      this.closeModal()
    },
    saveData () {
      const result = {
        date: this.setDate(this.editData.date),
        cost: this.editData.cost,
        payment: this.editData.payment,
        type: this.editData.type
      }
      this.costDB.child(this.editData.fbKey).update(result)
      this.closeEditModal()
      location.reload()
    },
    initializeData (name = '') {
      this.newDatas.push({
        date: this.today,
        cost: 0,
        payment: name.indexOf('3110') > 0 ? 'Hajime' : 'Shiori',
        type: 'foods'
      })
    }
  },
  created () {
    const that = this
    let now = new Date()
    this.today = this.setDate(now)

    this.fireDB = !firebase.app.length ? firebase.initializeApp(firebaseConf) : firebase.app()
    this.costDB = this.fireDB.database().ref('costs')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.syncFirebase()
        this.userEmail = String(user.email)
        this.initializeData(user.email)
      } else {
        alert('ログインしてね♪')
        that.$router.push('/')
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

.newInput {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #FFF;
}

.md-toolbar {
  max-width: 80VW !important;
}

.md-table {
  max-height: 60Vh
}

.margin100 {
  margin: 20px 50px !important;
}
</style>
