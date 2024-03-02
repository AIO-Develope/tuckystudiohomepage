<template>
  <NavBar/>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
};

import '@/assets/css/colors.css';

</script>

<script setup>
document.body.classList.toggle('dark-mode', false);

</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color-1);
}
</style>
