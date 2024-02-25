<template>
    <div class="modal-overlay" @click="$emit('close')">
        <div class="modal-container" @click.stop>
            <div class="modal-header">
                <h2>Edit User</h2>
                <button class="close-btn" @click="$emit('close')">✕</button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="saveChanges">
                    <div class="form-group">
                        <label for="fullName">Full Name:</label>
                        <input type="text" id="fullName" v-model="editedUser.fullName" class="form-control" disabled>
                    </div>
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" v-model="editedUser.username" class="form-control" disabled>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="editedUser.email" class="form-control" disabled>
                    </div>
                    <div class="form-group">
                        <label for="roles">Roles:</label>
                        <div class="roles-container">
                            <div v-for="(role, index) in editedUser.roles" :key="index" class="badge">
                                <span>{{ role.roleName }}</span>
                                <button type="button" @click="removeRole(index)" class="remove-btn">×</button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group preset-role-container">
                        <select v-model="selectedRole" id="presetRole" class="form-control">
                            <option value="" disabled>Select a role</option>
                            <option v-for="role in presetRoles" :key="role" :value="role">{{ role.roleName }}</option>
                        </select>
                        <button type="button" @click="addPresetRole" class="add-role-btn">Add Role</button>
                    </div>

                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import config from '../../../../config';

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
                uuid: this.user.uuid,
                roles: this.user.roles.slice(),
            },
            presetRoles: [],
            selectedRole: ''
        };
    },
    created() {
        this.fetchPresetRoles();
    },
    methods: {
        async fetchPresetRoles() {
            try {
                const response = await fetch(`${config.apiUrl}/admin/roles`, {
                    headers: {
                        'Authorization': `${this.getCookie('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch roles');
                }

                const responseData = await response.json();

                // Check if the key "allRoles" exists in the response data
                if ('allRoles' in responseData) {
                    // Access the array of roles under the key "allRoles" and map over it
                    this.presetRoles = responseData.allRoles.map(role => ({
                        id: role.id,
                        roleName: role.roleName
                    }));
                } else {
                    console.error('Invalid data format. Expected "allRoles" key.');
                }
            } catch (error) {
                console.error('Error fetching preset roles:', error);
            }
        },







        saveChanges() {
    // Emit the save event with the updated user data, including the UUID
    this.$emit('save', { ...this.editedUser });

    // Close the modal
    this.$emit('close');
},

        removeRole(index) {
            this.editedUser.roles.splice(index, 1);
        },
        addPresetRole() {
    if (this.selectedRole && !this.editedUser.roles.some(role => role.id === this.selectedRole.id)) {
        this.editedUser.roles.push(this.selectedRole);
    }
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
    z-index: 1001;
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
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.badge {
    display: inline-block;
    padding: 0.35rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: #fff;
    font-size: 0.875rem;
    margin-right: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.remove-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 0.875rem;
}

.preset-role-container {
    display: flex;
    align-items: center;
}

.preset-role-container select {
    flex: 1;
    margin-right: 1rem;
}

.add-role-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-role-btn:hover {
    background-color: #218838;
}
</style>
