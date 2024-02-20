<template>
  <div class="d-flex flex-row" id="app">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <hr>
      <ul class="nav flex-column">
        <li v-for="(item, index) in filteredSidebarItems" :key="index" class="nav-item">
          <button @click="goTo(item.route)" :class="{ active: isCurrentPage(item.route) }">
            <i :class="item.icon"></i> {{ item.label }}
          </button>
        </li>
      </ul>
    </div>

    <div v-if="!requiresAdminForCurrentRoute || isAdmin" class="content">
      <router-view v-if="!requiresAdminForCurrentRoute"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarItems: [
        { label: 'Home', route: '/account/home', icon: 'fas fa-home', requiresAdmin: false },
        { label: 'Register', route: '/account/register', icon: 'fas fa-chart-bar', requiresAdmin: true },
        // Add more items here if needed
      ],
      isAdmin: false // Set this to true if user is an admin
    };
  },
  computed: {
    filteredSidebarItems() {
      return this.sidebarItems.filter(item => !item.requiresAdmin || this.isAdmin);
    },
    requiresAdminForCurrentRoute() {
      const currentRoute = this.$route.path;
      const currentItem = this.sidebarItems.find(item => item.route === currentRoute);
      return currentItem ? currentItem.requiresAdmin : false;
    }
  },
  methods: {
    isCurrentPage(route) {
      return this.$route.path === route;
    },
    goTo(route) {
      this.$router.push(route);
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
