<template>
  <div id="login">
    <p>{{message}}</p>
    <md-input-container>
      <label>メールアドレス</label>
      <md-input required v-model="mail"></md-input>
      <span class="md-error">Validation message</span>
    </md-input-container>
    <md-input-container md-has-password>
      <label>パスワード</label>
      <md-input type="password" v-model="password"></md-input>
    </md-input-container>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      mail: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.mail, this.password).then(function () {
        this.$emit('sendAlert', 'ログインに成功しました')
      }).catch(function (error) {
        this.$emit('sendAlert', 'ログインに失敗しました')
        console.log(error.code)
      })
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.message = `${user.email}でログイン中だよ`
      } else {
        this.message = `ログインしてないよ`
      }
    })
  }
}
</script>

<style scoped>

</style>
