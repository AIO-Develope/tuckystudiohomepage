<template>
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2>Edit User</h2>
          <button class="close-btn" @click="$emit('close')">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveChanges">
            <div class="form-group">
              <label for="fullName">Full Name:</label>
              <input type="text" id="fullName" v-model="editedUser.fullName" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username" v-model="editedUser.username" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="editedUser.email" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="roles">Roles:</label>
              <input type="text" id="roles" v-model="editedUser.roles" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        editedUser: {
          fullName: this.user.fullName,
          username: this.user.username,
          email: this.user.email,
          roles: this.user.roles.join(', ')
        }
      };
    },
    methods: {
      saveChanges() {
        // Emit an event to send edited user data to parent component
        this.$emit('save', this.editedUser);
        // Close the modal
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .modal-header h2 {
    margin: 0;
  }
  
  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
  }
  
  .modal-body {
    padding: 20px 0;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  