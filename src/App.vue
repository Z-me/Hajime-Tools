<template>
  <div id="app">
    <vue-menu @snack="setSnackbar">
      <div slot="main-container">
        <router-view class="main-content"></router-view>
      </div>
    </vue-menu>
  </div>
</template>

<script>
import VueMenu from '@/components/menu'
export default {
  name: 'app',
  components: {
    VueMenu
  },
  data: () => ({
    auth: null,
    menuVisible: false,
    loginState: false,
    message: 'test comment',
    showSnackbar: false,
    position: 'center',
    duration: 4000,
    snackbarMessage: ''
  }),
  methods: {
    showLoginModal () {
      this.$refs.modal.modalControl(true)
    },
    closeModal (state) {
      this.$refs.modal.modalControl(false)
    },
    setSnackbar (msg) {
      this.snackbarMessage = msg
      this.showSnackbar = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh !important;
  margin: 0px;
}
input {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.md-app {
  border: 1px solid rgba(#000, .12);
  height: 100vh !important;
}
.md-drawer {
  background-color: #30A8F8;
  color: #FFFFFF;
  min-width: 200px !important;
  max-width: 20vw !important;
}
.md-toolbar {
  background-color: #30A8F8;
  color: #FFFFFF;
  min-height: 70px !important;
  height: 10vh !important;
  padding: 0 !important;
  width: 100vw !important;
}
.md-toolbar-row {
  background-color: #30A8F8;
}
.top-menu {
  color: #FFFFFF;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.main-content {
  height: 100vh !important;
}
.viewing-contents {
  padding: 16px;
}
.md-dialog-container {
  background: #FFFF !important;
  padding: 1vh !important;
}
.md-datepicker-header {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #FFF;
  background: #30A8F8;
}
.md-datepicker-body {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFF;
}
.md-datepicker-selected {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  flex-flow: column;
  vertical-align: top;
  color: #30A8F8;
  border: 4px solid #30A8F8;
}
.md-list {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.md-field {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.md-menu-content-container {
  background: #FFF;
  color: #30A8F8;
}
select[name=dateSelect]::placeholder {
  color: #FFF !important;
}
</style>
