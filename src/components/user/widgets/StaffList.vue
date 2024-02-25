<template>
  <!-- eslint-disable -->


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
        <div class="card mb-4" v-bind:class="{ 'animated-card': animateCards }"
          v-bind:style="{ 'animation-delay': index * 0.1 + 's' }">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture">
              <!-- Delete Button -->
              <button v-if="isAdmin && user.username !== username" @click="deleteUser(user)" class="delete-button">
                <i class="fa fa-trash-o"></i>
              </button>
              <button v-if="isAdmin" @click="openEditModal(user)" class="edit-button">
                <i class="fa fa-pencil"></i>
              </button>
            </div>
            <div>
              <h5 class="card-title mb-1">{{ user.fullName }}</h5>
              <p class="card-text mb-1">@{{ user.username }}</p>

              <p class="card-text mb-0">{{ user.email }}</p>
              <div class="roles-container">
                <span v-for="(role, roleIndex) in user.roles" :key="roleIndex" class="badge">{{ role.roleName }}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UserModal v-if="isModalOpen" :user="currentUserForEdit" @save="handleSave" @close="isModalOpen = false" />
</template>


<script>
import UserModal from './UserModal.vue'; // import your modal component

import { isAdmin } from '../../../utils/getAccTypes';
import config from '../../../../config';
export default {
  components: {
    UserModal
  },
  data() {
    return {
      users: [],
      isLoading: false,
      error: null,
      animateCards: false,
      isAdmin: false,
      username: null,
      searchQuery: '',
      isModalOpen: false,
      currentUserForEdit: null

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
    handleSave(savedUserData) {
  const roleUUIDs = savedUserData.roles.map(role => role.id); // Assuming role.id is the UUID
  const userDataWithRoleUUIDs = {
    roles: roleUUIDs
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNjc2YWJiZS04OGM4LTRhMWYtODhjYi00YzRiMmJhNzU4NWMiLCJpYXQiOjE3MDg4MTI1MTl9.1jP_hA5X7hQOvwKBZsKOK_5VxwOTojiJeZLJo0E6728';

  fetch(`${config.apiUrl}/admin/user/edit/${savedUserData.uuid}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(userDataWithRoleUUIDs)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    
    .catch(error => {
      console.error('Error:', error);
    });

  // Emit the user data with role UUIDs
  // Close the modal

  this.$emit('close');
  setTimeout(this.fetchUsers, 400);

},

    openEditModal(user) {
      this.currentUserForEdit = user;
      this.isModalOpen = true;
    },
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

.roles-container {
  margin-top: 0.5rem;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 300px;
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: #fff;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  width: 300px;
  height: 245px;
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

.edit-button {
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}


.delete-button:hover {
  color: #dc3545;
}

.edit-button:hover {
  color: #0051ff;
}
</style>
