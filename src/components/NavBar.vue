<template>
    <div class="nav-background">
      <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
          <router-link to="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fs-4">
            <strong id="HeadTitle">Tucky Studio</strong>
          </router-link>
          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link px-2"
                :class="{ 'link-secondary': $route.path === '/', 'link-dark': $route.path !== '/' }">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/projects" class="nav-link px-2"
                :class="{ 'link-secondary': $route.path === '/projects', 'link-dark': $route.path !== '/projects' }">Projects</router-link>
            </li>
          </ul>
          <div class="col-md-3 text-end">
            <button type="button" class="btn btn-outline-info">Login</button>
          </div>
        </header>
      </div>
    </div>
    <router-view></router-view>
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
  #HeadTitle {
    transition: all 0.3s ease;
  }
  
  #HeadTitle:hover {
    color: orange;
  }
  
  .nav-background {
    background-color: rgba(250, 250, 250, 0.8);
  backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 1000;
    
  }
  
  .nav-item {
    margin-right: 10px;
    transition: all 0.3s ease; 
  }
  
  .nav-item:hover {
    transform: scale(1.1);
  }
  
  .btn-outline-info:hover {
    color: #fff;
  }
  </style>
  