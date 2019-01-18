import firebase from 'firebase'

export default class Auth {
  constructor () {
    // this.authInfo = false
    this.isLoading = true
    this.setUser()
    console.log('AUTH: ', this.authInfo)
  }

  setUser = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.isLoading = false
        this.authInfo = {
          'email': user.email,
          'user': String(user.email).indexOf('3110') > 0 ? 'Hajime' : 'Shiori'
        }
      } else {
        this.authInfo = false
        this.isLoading = false
      }
    })
  }

  getUser = async () => {
    if (this.isLoading) {
      setTimeout(() => {
        return this.authInfo
      }, 3000)
    } else {
      return this.authInfo
    }
  }

  login = (mail, password) => {
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

  logout = () => {
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
}
