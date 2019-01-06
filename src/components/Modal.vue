<template>
  <div class="modalContents">
    <v-dialog
      v-model="show"
      width="500px"
      >
      <v-card>
        <v-card-title primary-title class="grey lighten-2">
          <h2><slot name="title"></slot></h2>
        </v-card-title>

        <v-card-text>
          <slot name="contents"></slot>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="action"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!--
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
-->
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
}
</style>
