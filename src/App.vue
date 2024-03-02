<template>

  <NavBar/>
  
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  methods: {
    toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
    }
  }
};

import '@/assets/css/colors.css';

</script>





<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color-1);
  background-color: var(--background-color-2);
}
</style>
