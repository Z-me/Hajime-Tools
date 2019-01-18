<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      >
      <v-text-field
        v-model="auth.mail"
        label="Email"
        :rules="emailRules"
        required>
      </v-text-field>
      <v-text-field
        v-model="auth.password"
        label="パスワード"
        :type="'password'"
        :rules="passowordRules"
        required>
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      valid: false,
      emailRules: [
        v => !!v || 'Emailは必須入力です',
        v => /.+@.+/.test(v) || 'Emailの形式にしてください'
      ],
      passowordRules: [
        v => !!v || 'Passwordは必須入力です'
      ]
    }
  },
  props: [
    'auth'
  ],
  methods: {
    login () {
      this.setSnack(firebase.auth().signInWithEmailAndPassword(this.mail, this.password).then(function () {
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
        // console.log(key, msg[key])
        if (msg[key] instanceof Object && 'msg' in msg[key]) {
          // console.log(msg[key].msg)
          return this.$emit('snack', msg[key].msg)
        }
      }
      // console.log(msg)
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
