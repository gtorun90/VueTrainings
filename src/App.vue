<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>    
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  data () {
    return {
    }
  },
  components:{
    appHeader:Header
  },
  created() {
  },
}
</script>

<style lang="scss">

</style>
