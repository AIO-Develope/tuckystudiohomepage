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
  <div class="container d-flex justify-content-between align-items-center">
      <h1 class="m-0">
        <a href="#" class="logo">Aromax</a>
      </h1>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#services">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#features">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#stats">Stats</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <form action="/discord">
        <button class="btn btn-secondary">Join</button>
      </form>
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
