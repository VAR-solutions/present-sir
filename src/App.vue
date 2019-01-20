<template>
  <div id="app">
    <Navbar/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
html, body{
  height: 100%;
  background: #ddd;
}
</style>
