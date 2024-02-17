<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><router-link to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">Home</router-link></li>
        <li class="nav-item"><router-link to="/projects" class="nav-link" :class="{ 'active': $route.path === '/projects' }">Projects</router-link></li>
      </ul>
    </header>
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  computed: {
    currentPage() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.nav-item {
  margin-right: 10px;
}

.nav-link:not(.active):hover {
  background-color: rgba(0, 123, 255, 0.1);
  transition: background-color 0.4s ease;
}

.nav-link.active {
  background-color: #007bff;
  transition: background-color 0.4s ease;
}
</style>
