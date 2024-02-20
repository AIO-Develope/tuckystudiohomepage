<template>
  <div class="container mt-5">
    <div class="register-form">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary text-white">Register</div>
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label for="username" class="form-label">Username:</label>
                  <input type="text" id="username" v-model="username" class="form-control" required>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" id="setPassword" v-model="setPassword" class="form-check-input" @change="clearTempPassword">
                  <label for="setPassword" class="form-check-label">Set Password</label>
                </div>
                <div v-if="setPassword" class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" id="password" v-model="password" class="form-control" required>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
            <transition name="fade">
              <div v-if="error" class="card-footer bg-danger text-white">{{ error }}</div>
            </transition>
            <transition name="fade">
              <div v-if="success" class="card-footer bg-success text-white">{{ success }}</div>
            </transition>
            <transition name="fade">
              <div v-if="!setPassword && tempPassword" class="card-footer bg-light">
                <p>Your temporary password:</p>
                <div class="input-group">
                  <input type="password" class="form-control" :value="censoredTempPassword" disabled>
                  <button class="btn btn-outline-secondary" @click="copyToClipboard" type="button">Copy</button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../../../config';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      success: '',
      tempPassword: '', 
      apiUrl: config.apiUrl,
      setPassword: false
    };
  },
  async mounted() {
    // Any initialization logic
  },
  methods: {
    async register() {
      let endpoint;

      try {
        const requestBody = {
          username: this.username
        };

        if (this.setPassword) {
          requestBody.password = this.password;

          endpoint = '/admin/user/register';
        } else {
          endpoint = '/admin/user/tempregister';

        }

        const response = await fetch(`${this.apiUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${this.getToken()}`
          },
          body: JSON.stringify(requestBody)
        });
        const result = await response.json();
        if (response.ok) {
          this.error = '';
          this.success = 'Successfully registered.';
          if (!this.setPassword) {
            this.tempPassword = result.TempPassword;
          }
          this.clearMessagesAfterDelay();
        } else {
          this.success = '';
          this.error = result.message;
          this.clearMessagesAfterDelay();
        }
      } catch (error) {
        console.error('Error:', error);
        this.error = 'An error occurred. Please try again later.';
        this.clearMessagesAfterDelay();
      }
    },
    getToken() {
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
      if (tokenCookie) {
        return tokenCookie.split('=')[1];
      }
      return null;
    },
    copyToClipboard() {
      const tempPasswordInput = document.createElement('input');
      tempPasswordInput.setAttribute('value', this.tempPassword);
      document.body.appendChild(tempPasswordInput);
      tempPasswordInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempPasswordInput);
    },
    clearMessagesAfterDelay() {
      setTimeout(() => {
        this.error = '';
        this.success = '';
      }, 5000);
    },
    clearTempPassword() {
      this.tempPassword = '';
    }
  },
  computed: {
    censoredTempPassword() {
      return this.tempPassword.replace(/./g, '*');
    }
  }
};
</script>

<style>
.register-form {
  animation: flyAndFadeIn 0.5s ease forwards;
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
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
