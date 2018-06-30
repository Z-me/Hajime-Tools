<template>
  <div class="modal">

    <md-dialog :md-active.sync="showModal" class="modalContents">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <body>
        <slot name="body"></slot>
      </body>
      <footer>
        <slot name="footer"></slot>
      </footer>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="showModal = false">Close</md-button>
        <md-button class="md-raised" @click="showModal = false">{{message}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: [
    'show'
  ],
  data: () => ({
    showModal: false,
    message: 'hogehoge'
  }),
  methods: {
    modalControl (state) {
      this.showModal = state
    }
  }
}
</script>

<style scoped>
.modalContents {
  font-family: 'Splatfont2', 'Splatfont2', "Splatfont2", sans-serif !important;
  text-rendering : optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
