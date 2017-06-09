<template>
  <div class="Login">
    <div class="modal-container">
      <div class="modal-header">
        <slot name="header">
          default header
        </slot>
      </div>
      <div class="modal-body">
        <slot name="body">
          default body
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          default footer
          <button class="modal-default-button" @click="$emit('close')">
            OK
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: '',
      showModal: false
    }
  },
  props: [
    'show'
  ],
  methods: {
    hideModal: function () {
      this.show = false
    }
  }
}
</script>

<style scoped>
  
</style>
