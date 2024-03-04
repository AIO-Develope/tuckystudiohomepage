<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="background">
    <div class="container" ref="container">
      <h1 class="text-center title mb-5 ">Our Team</h1>

    <div class="row">
      <!-- Loading Indicator -->
      <div v-if="isLoading" class="col-md-12 text-center"></div>
      <!-- Error Handling -->
      <div v-else-if="error" class="col-md-12 text-center">
        <p>Error fetching users. Please try again later.</p>
      </div>
      <!-- User Cards -->
      <div v-else class="col-md-4" v-for="(user, index) in users" :key="index">
        <div class="card mb-4" v-bind:class="{ 'animated-card': animateCards }"
          v-bind:style="{ 'animation-delay': index * 0.1 + 's' }">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture">
            </div>
            <div>
              <h5 class="card-title mb-1">@{{ user.username }}</h5>
              <p class="card-text mb-1">{{ user.fullName }}</p>
              <div class="roles-container">
                <span v-for="(role, roleIndex) in user.roles" :key="roleIndex" class="badge">{{ role.roleName }}</span>
              </div>
            </div>
            <!-- Social Media Icons -->
            <div class="social-media-icons">
              <a href="#"><i class="fa fa-tiktok"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 
</template>

<script>
import config from '../../config';
export default {
  data() {
    return {
      users: [],
      isLoading: false,
      error: null,
      animateCards: false,
      observer: null
    };
  },
  mounted() {
    this.observeContainer();
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.isLoading = true;
      fetch(`${config.apiUrl}/user/staff`)
        .then(response => response.json())
        .then(data => {
          this.users = data.map(user => ({
            ...user,
            fullName: `${user.firstName} ${user.lastName}`
          }));
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching users:", error);
          this.error = "Error fetching users. Please try again later.";
          this.isLoading = false;
        });
    },
    observeContainer() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
      };
      this.observer = new IntersectionObserver(this.handleIntersection, options);
      this.observer.observe(this.$refs.container);
    },
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCards = true;
          this.observer.unobserve(entry.target);
        }
      });
    }
  }
};
</script>

  
  <style scoped>
  
  
  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: auto;
  }
  
  

  .social-media-icons {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-media-icons a {
  margin: 0 5px; 
  color: var(--text-color-3);
}

  .roles-container {
    margin-top: 0.5rem;
    display: inline-block;
    width: 240px;
    height: 60px;
    overflow: hidden;
    margin-bottom: 0.5rem;
    margin-left: 20px;
    margin-right: 12px;
    text-align: center;
  }
  .background{
    background-color: var(--background-color-3);
    padding-top: 60px;
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
    width: 280px;
    height: 325px;
    margin: 10px;
    overflow: hidden;
    border-color: var(--background-color-4);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  
  .card-body{
    background-color: var(--card-color-1);
    color: var(--text-color-1) !important;
    align-items: center;
  }
  
  .card-footer{
    background-color: var(--card-color-1) !important;
    color: var(--text-color-1) !important;
    
  }
  
  

  

  
  .card-title,
  .card-text {
    margin-bottom: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
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
  
  .title {
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--text-color-1);
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
  
  .delete-button {
    padding: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    color: var(--text-color-3);
  }
  
  .edit-button {
    padding: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    color: var(--text-color-3);
  
  }
  
  .social-media-icons a {
    transition: color 0.3s ease;
  }

  .social-media-icons a:hover {
    color: var(--text-color-1);
  }
  
  .delete-button:hover {
    color: #dc3545;
  }
  
  .edit-button:hover {
    color: #0051ff;
  }
  </style>
  