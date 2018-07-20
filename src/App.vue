<template>
  <div id="app">
    <htop/>
    <router-view/>
  </div>
</template>
<script>
import htop from '@/components/common/htop'

export default {
  name: 'App',
   components:{
    htop,
  }
}
</script>
<style>
 @import './assets/style/basic.css';
 @import './assets/style/iconfont.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
