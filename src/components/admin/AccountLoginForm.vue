<template>
    <div class="container">
      <form @submit.prevent="login" class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 330px;
    margin: 0 auto;
  }
  
  .form-signin {
    margin-top: 100px;
    background-color: #fff;
    padding: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }
  
  .form-signin .checkbox {
    font-weight: normal;
  }
  
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  
  .form-signin input[type="email"],
  .form-signin input[type="password"] {
    margin-bottom: 10px;
  }
  
  .form-signin button[type="submit"] {
    font-size: 16px;
  }
  </style>
  