<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import header from '@/components/layout/Header'
import footer from '@/components/layout/Footer'

export default {
  components: {
    'app-header': header,
    'app-footer': footer
  },
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700,900');
body {
  margin: 0;
}
#app {
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
  margin:0;
}
</style>
