<template>
  <div id="header">
    <md-toolbar class="md-container">
      <md-button class="md-icon-button" @click.native="$refs.sidenav.toggle()">
        <md-icon>menu</md-icon>
      </md-button>
      
      <h2 class="md-title" style="flex: 1">Hajime Tools</h2>
      
      <router-link to="/" class="md-button">メモ</router-link>
      <router-link to="/minecraft" class="md-button">マイクラ</router-link>
      <router-link to="/house" class="md-button">カケイボ</router-link>
      <router-link to="/kpt" class="md-button">KPT</router-link>
    </md-toolbar>
    
    <md-sidenav class="md-left" ref="sidenav">
      <md-toolbar class="md-account-header">
        <h1>一覧</h1>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <md-avatar>
            <img src="https://irec.jp/images/upfile/icon-microphone01.png" alt="People">
          </md-avatar>
          <md-button>Voice Memo</md-button>
        </md-list-item>
        <md-list-item>
          <md-avatar>
            <img src="http://is1.mzstatic.com/image/thumb/Purple127/v4/97/59/5f/97595f13-e668-dcc5-69df-441c4d798a91/source/1200x630bb.jpg" alt="People">
          </md-avatar>
          <md-button>Minecraft</md-button>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-content {
    padding: 0px;
    margin: 0px;
  }
  
  .menue {
    float: right;
  }

</style>
