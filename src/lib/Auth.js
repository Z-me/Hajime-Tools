import firebase from 'firebase'

export default class Auth {
  constructor () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.nowUser = user.email
        this.loginState = true
      } else {
        this.loginState = false
      }
    })
  }

  checkLogin () {
    return this.loginState
  }

  login (mail = '', password = '') {
    return firebase.auth().signInWithEmailAndPassword(mail, password).then(() => {
      return {
        'msg': 'ログインに成功しました。',
        'result': true
      }
    }).catch(function (error) {
      return {
        'msg': `ログインに失敗しました。ERROR_CODE: ${error.code}`,
        'result': false
      }
    })
  }

  logout () {
    return firebase.auth().signOut().then(() => {
      return {
        'msg': 'ログアウトしました。',
        'result': true
      }
    }).catch(function (error) {
      return {
        'msg': `ログアウトに失敗しました。ERROR_CODE: ${error}`,
        'result': false
      }
    })
  }

  getUser () {
    return this.nowUser
  }
}
