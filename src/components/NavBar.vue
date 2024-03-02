<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

  <div class="nav-background">
    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
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
          <li class="nav-item">
            <router-link to="/contact" class="nav-link px-2"
              :class="{ 'link-secondary': $route.path === '/contact', 'link-dark': $route.path !== '/contact' }">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/wiki" class="nav-link px-2"
              :class="{ 'link-secondary': $route.path === '/wiki', 'link-dark': $route.path !== '/wiki' }">Wiki</router-link>
          </li>
        </ul>
        <div v-if="isLoggedIn" class="col-md-3 text-end">
          <div class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{ username || 'Profile' }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><button class="dropdown-item" @click="goToAccount">My Account</button></li>
              <li><button class="dropdown-item" @click="logout">Logout</button></li>
            </ul>
            <button class="btn btn-outline-primary" @click="toggleDarkMode">
              <i v-if="darkModeActive" class="fas fa-sun"></i>
              <i v-else class="fas fa-moon"></i>
            </button>

          </div>
        </div>
        <div v-else class="col-md-3 text-end">
          <button type="button" class="btn btn-outline-primary" @click="goToLogin">Login</button>
          <button class="btn btn-outline-primary" @click="toggleDarkMode">
            <i v-if="darkModeActive" class="fas fa-sun"></i>
            <i v-else class="fas fa-moon"></i>
          </button>
        </div>


      </header>


    </div>

  </div>

  <router-view></router-view>
</template>


<script>
import { verifyToken } from '@/utils/authVerify';

export default {
  data() {
    return {
      isLoggedIn: false,
      username: '',
      darkModeActive: false
    };
  },
  created() {
    this.checkTokenAndUsername();
    this.loadDarkModeFromCookie();
  },
  methods: {
    toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      this.darkModeActive = !this.darkModeActive;
      this.saveDarkModeToCookie();
    },
    async logout() {
      this.clearCookies();
      this.isLoggedIn = false;
      this.username = '';
      this.$router.push('/login');
    },
    async checkTokenAndUsername() {
      try {
        this.isLoggedIn = await verifyToken();
        const usernameCookie = this.getCookie('username');
        if (usernameCookie) {
          this.username = usernameCookie;
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToAccount() {
      this.$router.push('/account/home');
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    saveDarkModeToCookie() {
      document.cookie = `darkModeActive=${this.darkModeActive}; path=/;`;
    },
    loadDarkModeFromCookie() {
      const darkModeCookie = this.getCookie('darkModeActive');
      if (darkModeCookie) {
        this.darkModeActive = darkModeCookie === 'true';
        if (this.darkModeActive) {
          document.body.classList.add('dark-mode');
        }
      }
    },
    clearCookies() {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'darkModeActive=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear dark mode cookie
    }
  }
};
</script>


<style scoped>
#HeadTitle {
  transition: all 0.3s ease;
  color: var(--text-color-1);


}

#HeadTitle:hover {
  color: orange;
}

.nav-background {
  background-color: var(--background-color-nav);

  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-item {
  margin-right: 10px;
  transition: all 0.3s ease;
  color: var(--text-color-1);

}


.nav-item:hover {
  transform: scale(1.1);
}

.btn-outline-info:hover {
  color: #fff;
}

.link-dark {
  color: var(--text-color-2) !important;
}

.link-secondary {
  color: var(--text-color-1) !important;
}


.btn-outline-info:focus {
  color: #fff;
}

.toggle-dark-mode,
.btn-outline-primary {
  margin-left: 10px;
}
</style>
