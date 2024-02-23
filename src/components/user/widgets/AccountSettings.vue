
<template>
    <div class="container mt-5">
        <div class="profile-settings-form">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="card">
            <div class="card-header bg-primary text-white">Profile Settings</div>
            <div class="card-body">
                <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="position-relative">
                    <label for="avatar" class="form-label">Profile Picture</label>
                    <input type="file" class="form-control" id="avatar" @change="handleFileUpload" accept="image/*"
                        style="display: none">
                    <div class="default-avatar text-center mb-3" @click="openFileInput">
                        <img :src="avatarPreview" alt="Profile Picture" class="img-thumbnail rounded-circle"
                            style="width: 200px; height: 200px; object-fit: cover;">
                    </div>
                    <small class="form-text text-muted d-block text-center">Click the image to upload a new profile
                        picture.</small>
                </div>
            </div>
            <div class="col-md-8">
                <form @submit.prevent="submitForm" class="row g-3">
                    <div class="col-md-6">
                        <label for="firstName" class="form-label">Vorname</label>
                        <input type="text" class="form-control" id="firstName" v-model="formData.firstName">
                    </div>
                    <div class="col-md-6">
                        <label for="lastName" class="form-label">Nachname</label>
                        <input type="text" class="form-control" id="lastName" v-model="formData.lastName">
                    </div>
                    <div class="col-md-12">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" v-model="formData.username">
                    </div>
                    <div class="col-md-12">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="formData.email">
                        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="col-md-12">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" v-model="formData.password">
                    </div>
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
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
export default {
    data() {
        return {
            formData: {
                firstName: '', // Placeholder for user's first name
                lastName: '', // Placeholder for user's last name
                username: '', // Placeholder for user's username
                email: '', // Placeholder for user's email
                password: '', // Placeholder for user's password
                avatarFile: null // Placeholder for avatar file
            }
        };
    },
    created() {
        // Fetch user information when the component is created
        this.fetchUserInformation();
    },
    computed: {
        // Compute the URL for the avatar preview
        avatarPreview() {
            return this.formData.avatarFile ? URL.createObjectURL(this.formData.avatarFile) : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png';
        }
    },
    methods: {
        submitForm() {
    // Check if any field has been modified
    const isModified = Object.values(this.formData).some(value => value !== '');

    if (!isModified) {
        console.log('No changes made.');
        return;
    }

    // Handle form submission here
    console.log('Form submitted with data:', this.formData);

    // Construct FormData object to include modified form data
    const formData = new FormData();

    // Append fields to formData if they are not empty
    if (this.formData.firstName.trim() !== '') {
        formData.append('firstName', this.formData.firstName);
    }
    if (this.formData.lastName.trim() !== '') {
        formData.append('lastName', this.formData.lastName);
    }
    if (this.formData.username.trim() !== '') {
        formData.append('username', this.formData.username);
    }
    if (this.formData.email.trim() !== '') {
        formData.append('email', this.formData.email);
    }
    if (this.formData.password.trim() !== '') {
        formData.append('password', this.formData.password);
    }
    if (this.formData.avatarFile !== null) {
        formData.append('profilePicture', this.formData.avatarFile);
    }

    // Retrieve the token from the local cookie
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

    // Make sure a token is found
    if (!token) {
        console.error('Token not found in cookies');
        return;
    }

    // Extract the token value
    const authToken = token.split('=')[1].trim();

    // Make a POST request to update user information
    fetch('http://localhost:3000/auth/edit', {
        method: 'POST',
        headers: {
            'Authorization': `${authToken}`
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User information updated successfully:', data);
    })
    .catch(error => {
        console.error('Error updating user information:', error);
    });
},
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // Update the formData with the selected file
                this.formData.avatarFile = file;
            }
        },
        openFileInput() {
            // Trigger the click event of the file input field when clicking on the default avatar
            document.getElementById('avatar').click();
        },
        fetchUserInformation() {
  // Retrieve the token from the local cookie
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

  // Make sure a token is found
  if (!token) {
    console.error('Token not found in cookies');
    return;
  }

  // Extract the token value
  const authToken = token.split('=')[1].trim();

  // Make a GET request to fetch user information
  fetch('http://localhost:3000/auth/getUserInformationsAuth', {
    headers: {
      'Authorization': `${authToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Update formData with the fetched user information
    this.formData.firstName = ''; // Clear previous data
    this.formData.lastName = ''; // Clear previous data
    this.formData.username = ''; // Clear previous data
    this.formData.email = ''; // Clear previous data

    // Set placeholders for the input fields
    document.getElementById('firstName').placeholder = data.firstName;
    document.getElementById('lastName').placeholder = data.lastName;
    document.getElementById('username').placeholder = data.username;
    document.getElementById('email').placeholder = data.email;

    // Set the profile picture directly
    document.querySelector('.default-avatar img').src = data.profilePicture;
  })
  .catch(error => {
    console.error('Error fetching user information:', error);
  });
}

    }
};
</script>
  
<style scoped>
.default-avatar {
    position: relative;
    cursor: pointer;
}

.img-thumbnail {
    max-width: 100%;
    height: auto;
}

.form-label {
    font-weight: bold;
}

.mt-5 {
    margin-top: 3rem;
}

.mb-4 {
    margin-bottom: 2rem;
}







.profile-settings-form {
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
  