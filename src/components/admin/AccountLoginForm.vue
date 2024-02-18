<template>
  <div class="container mt-5" v-if="!loggedIn">
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
</template>

<script>
import { verifyToken } from '@/utils/authVerify';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      success: '',
      loggedIn: false
    };
  },
  async mounted() {
    this.loggedIn = await verifyToken();
    console.log(this.loggedIn)
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
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
          document.cookie = `token=${result.token}; path=/`;
          this.error = '';
          this.success = 'Successfully logged in.';
          this.loggedIn = true;
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
.error {
  color: red;
}
.success {
  color: green;
}
</style>
