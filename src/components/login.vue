<template>
  <div id="login">
    <md-input-container>
      <label>ユーザ メイ</label>
      <md-input required></md-input>
      <span class="md-error">Validation message</span>
    </md-input-container>
    <md-input-container md-has-password>
      <label>パスワード</label>
      <md-input type="password"></md-input>
    </md-input-container>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style scoped>

</style>
