<template>
  <div class="HouseHold">
    <cost-table :items='costData'></cost-table>
  </div>
</template>

<script>
import CostTable from '@/components/CostTable'
import Modal from '@/components/Modal'
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
    CostTable,
    Modal
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
    }
  },
  created () {
    this.fireDB = !firebase.app.length ? firebase.initializeApp(firebaseConf) : firebase.app()
    this.costDB = this.fireDB.database().ref('costs')
    this.syncFirebase()
  }
}
</script>

<style scoped>
</style>
