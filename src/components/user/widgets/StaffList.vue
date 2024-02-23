<template>
    <div class="container">
      <div class="row">
        <!-- Loading Indicator -->
        <div v-if="isLoading" class="col-md-12 text-center">
          <p>Loading...</p>
        </div>
  
        <!-- Error Handling -->
        <div v-else-if="error" class="col-md-12 text-center">
          <p>Error fetching users. Please try again later.</p>
        </div>
  
        <!-- User Cards -->
        <div v-else v-for="(user, index) in users" :key="index" class="col-md-4">
          <div class="card mb-4" v-bind:class="{ 'animated-card': animateCards }" v-bind:style="{ 'animation-delay': index * 0.1 + 's' }">
            <div class="card-body d-flex align-items-center">
              <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture mr-3">
              <div>
                <h5 class="card-title mb-1">{{ user.fullName }}</h5>
                <p class="card-text mb-1">{{ user.username }}</p>
                <p class="card-text mb-0">{{ user.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        isLoading: false,
        error: null,
        animateCards: false
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        this.isLoading = true;
        const token = this.getCookie("token");
        fetch("http://localhost:3000/auth/staff", {
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
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-picture {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .card-title,
  .card-text {
    margin-bottom: 0.3rem;
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
  
  .card {
    opacity: 0;
  }
  
  </style>
  