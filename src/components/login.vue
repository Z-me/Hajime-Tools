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
<!--    <div slot="body" class="md-layout">
      <p class="md-size-100">{{message}}</p>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <md-field :class="messageClass">
          <label>メールアドレス</label>
          <md-input v-model="mail" required></md-input>
          <span class="md-error">ココ、忘れてるよ</span>
        </md-field>
      </div>
      <div class="md-layout-item md-size-50 md-small-size-100">
        <md-field>
          <label>パスワード</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>
    </div>-->

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
      firebase.auth().signInWithEmailAndPassword(this.mail, this.password).then(function () {
        // this.$emit('sendAlert', 'ログインに成功しました')
        this.colseModal()
      }).catch(function (error) {
        // this.$emit('sendAlert', 'ログインに失敗しました')
        console.log(error.code)
      })
    },
    colseModal () {
      this.$emit('close', false)
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
