
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
                                            <input type="file" class="form-control" id="avatar" @change="handleFileUpload"
                                                accept="image/*" style="display: none">
                                            <div class="default-avatar text-center mb-3" @click="openFileInput">
                                                <img :src="avatarPreview" alt="Profile Picture"
                                                    class="img-thumbnail rounded-circle"
                                                    style="width: 200px; height: 200px; object-fit: cover;">
                                            </div>
                                            <small class="form-text text-muted d-block text-center">Click the image to
                                                upload a new profile
                                                picture.</small>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <form @submit.prevent="submitForm" class="row g-3">
                                            <div class="col-md-6">
                                                <label for="firstName" class="form-label">First name</label>
                                                <input type="text" class="form-control" id="firstName"
                                                    v-model="formData.firstName">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="lastName" class="form-label">Last name</label>
                                                <input type="text" class="form-control" id="lastName"
                                                    v-model="formData.lastName">
                                            </div>
                                            <div class="col-md-12">
                                                <label for="username" class="form-label">Username</label>
                                                <input type="text" class="form-control" id="username"
                                                    v-model="formData.username">
                                            </div>
                                            <div class="col-md-12">
                                                <label for="email" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="email"
                                                    v-model="formData.email">
                                                <small class="form-text text-muted">We'll never share your email with anyone
                                                    else.</small>
                                            </div>
                                            <div class="col-md-12">
                                                <label for="password" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="password"
                                                    v-model="formData.password">
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
            formData: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                avatarFile: null
            },
            error: '',
            success: ''
        };
    },
    created() {
        this.fetchUserInformation();
    },
    computed: {
        avatarPreview() {
            if (this.formData.avatarFile) {
                return URL.createObjectURL(this.formData.avatarFile);
            } else {
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png';
            }
        }
    },
    methods: {
        async submitForm() {
    const isModified = Object.values(this.formData).some(value => value !== '');

    if (!isModified) {
        console.log('No changes made.');
        return;
    }

    const formData = new FormData();

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

    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

    if (!token) {
        console.error('Token not found in cookies');
        return;
    }

    const authToken = token.split('=')[1].trim();

    try {
        const response = await fetch(`${config.apiUrl}/auth/edit`, {
            method: 'POST',
            headers: {
                'Authorization': `${authToken}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.error) {
            this.error = data.error;
        } else {
            
            
            setTimeout(() => {
                this.resetForm();
                this.success = "User information updated successfully.";


            }, 1000);

            

                
        }
    } catch (error) {
        this.error = 'Error updating user information.';
        console.error('Error updating user information:', error);
    }
},

        resetForm() {
            Object.assign(this.formData, {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                avatarFile: null
            });
            this.fetchUserInformation();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.formData.avatarFile = file;
            }
        },

        clearMessagesAfterDelay() {
            setTimeout(() => {
                this.error = '';
                this.success = '';
            }, 5000);
        },

        openFileInput() {
            document.getElementById('avatar').click();
        },
        fetchUserInformation() {
            const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

            if (!token) {
                console.error('Token not found in cookies');
                return;
            }

            const authToken = token.split('=')[1].trim();

            fetch(`${config.apiUrl}/auth/getUserInformationsAuth`, {
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
                    this.formData.firstName = '';
                    this.formData.lastName = '';
                    this.formData.username = '';
                    this.formData.email = '';

                    document.getElementById('firstName').placeholder = data.firstName;
                    document.getElementById('lastName').placeholder = data.lastName;
                    document.getElementById('username').placeholder = data.username;
                    document.getElementById('email').placeholder = data.email;
                    if (data.profilePicture) {
                        document.querySelector('.default-avatar img').src = data.profilePicture;
                    } else {
                        document.querySelector('.default-avatar img').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png';
                    }
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



.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
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

.profile-settings-form {
    animation: flyAndFadeIn 0.5s ease forwards;
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
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

.card {
    background-color: var(--card-color-1);
    color: var(--text-color-1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.form-control {
    background-color: var(--background-color-2);
    color: var(--text-color-1);
}


.form-control:focus {
    background-color: var(--background-color-3);
    color: var(--text-color-1);
}

.form-control::placeholder {
    color: var(--text-color-2);
}


</style>
  