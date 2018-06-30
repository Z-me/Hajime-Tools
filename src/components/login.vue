<template>
  <div id="login">
    <h1 slot="header" class="modalHeader">ログイン</h1>
    <form slot="body" class="loginForm">
      <p>ログインステータス: {{ loginMessage }}</p>
      <md-field>
        <md-icon>mail</md-icon>
        <label>Email</label>
        <md-input v-model="mail"></md-input>
      </md-field>
      <md-field>
        <md-icon>lock</md-icon>
        <label>パスワード</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>
    </form>
    <md-dialog-actions>
      <md-button class="md-primary" @click="login">ログイン</md-button>
      <md-button class="md-primary" @click="colseModal">モドル</md-button>
    </md-dialog-actions>

  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      mail: '',
      password: ''
    }
  },
  props: [
    'loginState',
    'loginMessage'
  ],
  methods: {
    login () {
      this.setSnack(firebase.auth().signInWithEmailAndPassword(this.mail, this.password).then(function () {
        // return this.setSnack('ログインに成功しました。')
        return {'msg': 'ログインに成功しました。'}
      }).catch(function (error) {
        return {'msg': 'ログインに失敗しました。ERROR_CODE: ' + error.code}
      }))
      this.colseModal()
    },
    colseModal () {
      this.$emit('close', false)
    },
    setSnack (msg) {
      for (let key in msg) {
        console.log(key, msg[key])
        if (msg[key] instanceof Object && 'msg' in msg[key]) {
          console.log(msg[key].msg)
          return this.$emit('snack', msg[key].msg)
        }
      }
      console.log(msg)
      // console.log(result)
      // this.$emit('snack', result)
    }
  }
}
</script>

<style scoped>
.modalHeader {
  max-width: 500px;
  width: 40vw;
  text-align: center;
}
</style>
