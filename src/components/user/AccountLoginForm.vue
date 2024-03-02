<template>
  <div class="container mt-5">
    <div v-if="!loggedIn" class="login-form">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary text-white">Login</div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Username:</label>
                  <input type="text" id="username" v-model="username" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" id="password" v-model="password" class="form-control" required>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
            <div v-if="error" class="card-footer bg-danger text-white">{{ error }}</div>
            <div v-if="success" class="card-footer bg-success text-white">{{ success }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center mt-3">
        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { verifyToken } from '@/utils/authVerify';
import config from '../../../config';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      success: '',
      loggedIn: false,
      apiUrl: config.apiUrl,

    };
  },
  async mounted() {
    this.loggedIn = await verifyToken();
    if (this.loggedIn) {
      this.$router.push('/account/home');
    }
  },
  methods: {

    async logout() {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      this.loggedIn = false;

      location.reload();
    },
    async login() {
  try {
    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });
    const result = await response.json();

    if (response.ok) {
      if (result.tempPass) {
        const newPassword = prompt("Please enter a new password:");

        if (newPassword) {
          const patchResponse = await fetch(`${this.apiUrl}/auth/edit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${result.token}`
            },
            body: JSON.stringify({
              password: newPassword
            })
          });

          if (patchResponse.ok) {
            this.success = 'Password updated successfully.';
          } else {
            this.error = 'An error occurred while updating the password. Please try again later.';
          }
        } else {
          this.error = 'Password change canceled.';
        }
      } else {
        document.cookie = `token=${result.token}; path=/`;
        document.cookie = `username=${this.username}; path=/`;

        this.error = '';
        this.success = 'Successfully logged in.';
        this.loggedIn = true;
        location.reload();
      }
    } else {
      this.success = '';
      this.error = result.message;
    }
  } catch (error) {
    console.error('Error:', error);
    this.error = 'An error occurred. Please try again later.';
  }
}





  }
};
</script>

<style>
.card{
  border-color: var(--background-color-4) !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.card-body{
  background-color: var(--card-color-1);
  color: var(--text-color-1) !important;

}


.form-control{
    background-color: var(--background-color-2) !important;
    color: var(--text-color-1) !important;
    border-color: var(--textbox-border-color) !important;
}


.form-control:focus {
    background-color: var(--background-color-3) !important;
    color: var(--text-color-1) !important;
}

.form-control::placeholder {
    color: var(--text-color-2) !important;
}

.login-form {
  animation: flyAndFadeIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes flyAndFadeIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}


</style>

