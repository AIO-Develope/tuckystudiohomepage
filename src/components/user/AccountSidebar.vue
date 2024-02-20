<template>
  <div class="d-flex flex-row" id="app">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <hr>
      <ul class="nav flex-column">
        <li class="nav-item">
          <button @click="goTo('/account/home')" :class="{ active: isCurrentPage('/account/home') }">
            <i class="fas fa-home"></i> Staff
          </button>
        </li>
        <li class="nav-item" v-if="isAdminBool">
          <button @click="goTo('/account/dashboard')" :class="{ active: isCurrentPage('/account/dashboard') }">
            <i class="fas fa-chart-bar"></i> Register
          </button>
        </li>
      </ul>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { isAdmin } from '@/utils/getAccTypes.js';

export default {
  data() {
    return {
      isAdminBool: false
    };
  },
  methods: {
    isCurrentPage(route) {
      return this.$route.path === route;
    },
    async fetchAdminStatus() {
      try {
        this.isAdminBool = await isAdmin(); // Update isAdminBool based on the isAdmin function
      } catch (error) {
        console.error("Error fetching admin status:", error);
      }
    },
    goTo(route) {
      this.$router.push(route);
    }
  },
  computed: {
    isAdmin() {
      return this.isAdminBool; // Make the computed property use isAdminBool
    }
  },
  created() {
    this.fetchAdminStatus(); // Fetch the admin status when the component is created
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
