<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="container">
    <input type="text" v-model="searchQuery" placeholder="Search users..." class="form-control mb-3">

    <div class="row">
      
      <!-- Loading Indicator -->
      <div v-if="isLoading" class="col-md-12 text-center">
       
      </div>

      <!-- Error Handling -->
      <div v-else-if="error" class="col-md-12 text-center">
        <p>Error fetching users. Please try again later.</p>
      </div>

      <!-- User Cards -->
      <div v-else class="col-md-4" v-for="(user, index) in filteredUsers" :key="index">
        <div class="card mb-4" v-bind:class="{ 'animated-card': animateCards }" v-bind:style="{ 'animation-delay': index * 0.1 + 's' }">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture">
              <!-- Delete Button -->
              <button v-if="isAdmin && user.username !== username" @click="deleteUser(user)" class="delete-button">
  <i class="fa fa-trash-o"></i>
</button>            </div>
            <div>
              <h5 class="card-title mb-1">{{ user.fullName }}</h5>
              <p class="card-text mb-1">@{{ user.username }}</p>
              <p class="card-text mb-0">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { isAdmin } from '../../../utils/getAccTypes';
import config from '../../../../config';
export default {
  data() {
    return {
      users: [],
      isLoading: false,
      error: null,
      animateCards: false,
      isAdmin: false,
      username: null,
      searchQuery: ''

    };
  },
  mounted() {
    this.checkAdmin();
    this.fetchUsers();
    this.username = this.getCookie("username");
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const fullName = user.fullName.toLowerCase();
        const username = user.username.toLowerCase();
        const email = user.email.toLowerCase();
        const query = this.searchQuery.toLowerCase();
        return fullName.includes(query) || username.includes(query) || email.includes(query);
      });
    }
  },
  methods: {
    async checkAdmin() {
      this.isAdmin = await isAdmin();
    },
    fetchUsers() {
      this.isLoading = true;
      const token = this.getCookie("token");
      fetch(`${config.apiUrl}/auth/staff`, {
        headers: {
          Authorization: `${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          this.users = data.map(user => ({
            ...user,
            fullName: `${user.firstName} ${user.lastName}`
          }));
          this.isLoading = false;
          setTimeout(() => {
            this.animateCards = true;
          }, 100);
        })
        .catch(error => {
          console.error("Error fetching users:", error);
          this.error = "Error fetching users. Please try again later.";
          this.isLoading = false;
        });
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    deleteUser(user) {
  if (confirm(`Are you sure you want to delete ${user.username}?`)) {
    const token = this.getCookie("token");
    fetch(`${config.apiUrl}/admin/user/delete/${user.uuid}`, {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      if (response.ok) {
        this.users = this.users.filter(u => u.uuid !== user.uuid);
        console.log('User deleted successfully.');
      } else {
        throw new Error('Failed to delete user');
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
  }
}

  }

};
</script>

<style scoped>
.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: auto;
}

.card {
  width: 300px;
  height: 220px;
  margin: 10px;
  overflow: hidden;
}

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title,
.card-text {
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-card {
  animation: fadeIn 0.5s ease forwards;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 5px;
}

.col-md-4 {
  flex: 1;
}

.card {
    opacity: 0;
  }


  
  .delete-button {
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}

.delete-button:hover {
  color: #dc3545;
}
</style>
