

<template>
  <div class="d-flex flex-row" id="app">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <hr>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="route in filteredRoutes" :key="route.path">
          <button @click="goTo(route.path)" :class="{ active: isCurrentPage(route.path) }">
            <i class="fas" :class="route.icon"></i> {{ route.name }}
          </button>
        </li>
      </ul>
    </div>

    <div v-if="!requiresAdminForCurrentRoute() || isAdmin" class="content">
  <router-view></router-view>
</div>

  
  </div>
</template>

<script>
import config from '../../../config';

export default {
  data() {
    return {
      isAdmin: false,
      routes: [
        { path: '/account/home', name: 'Home', icon: 'fa-home', adminRequired: false },
        { path: '/account/register', name: 'Register', icon: 'fa-chart-bar', adminRequired: true },
        { path: '/account/staff', name: 'Staff', icon: 'fa-chart-bar', adminRequired: false }

      ]
    };
  },
  created() {
    this.checkAdminStatus();
  },
  methods: {
    async checkAdminStatus() {
  const token = this.getCookie("token");

  if (!token) {
    this.$router.push('/login'); // Redirect to login if token doesn't exist
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${config.apiUrl}/auth/getUserInformationsAuth`, requestOptions);
    const result = await response.json();

    this.isAdmin = result.isAdmin;
  } catch (error) {
    console.error(error);
    this.isAdmin = false;
  }

  if (!this.isAdmin && this.requiresAdminForCurrentRoute()) {
    this.$router.push('/account/home');
  }
},

    getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
          return cookieValue;
        }
      }
      return null;
    },
    isCurrentPage(route) {
      return this.$route.path === route;
    },
    goTo(route) {
      this.$router.push(route);
    },
    requiresAdminForCurrentRoute() {
      const currentRoute = this.$route.path;
      const route = this.routes.find(route => route.path === currentRoute);
      return route ? route.adminRequired : false;
    }
  },
  computed: {
    filteredRoutes() {
      return this.routes.filter(route => !route.adminRequired || (route.adminRequired && this.isAdmin));
    }
  }
};
</script>





<style scoped>
#app {
  height: calc(100vh - 72px);
}

.d-flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}
.sidebar {
  width: 280px;
  margin-right: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
}


.sidebar-header {
  text-align: center;
  margin-bottom: 20px;
}

.nav-item {
  margin-bottom: 10px;
}

button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  border: none;
  background-color: transparent;
  color: #333;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ddd;
}

button.active {
  background-color: #007bff;
  color: white;
}

button i {
  margin-right: 10px;
}

</style>
