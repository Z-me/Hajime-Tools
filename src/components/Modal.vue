<template>
  <div class="modalContents">
    <v-dialog
      v-model="show"
      width="500px"
      >
      <v-card>
        <v-card-title dark :class="modalColor">
          <h2 style="color: white;"><slot name="title"></slot></h2>
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
</template>

<script>
export default {
  name: 'modal',
  props: [
    'show',
    'modalColor'
  ],
  data: () => ({
    showModal: false
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
