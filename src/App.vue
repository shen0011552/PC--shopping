<template>
  <div id="app">
    <store-header></store-header>
    <router-view/>
  </div>
</template>

<script>
import storeHeader from '@/components/header'
export default {
  name: 'App',
  components:{
  	storeHeader
  }
}
</script>


<style lang="less">
@import "assets/css/bootstrap.min.css";
</style>
