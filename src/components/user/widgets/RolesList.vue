<template>
    <div class="container">
        <h2>Roles</h2>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(role) in roles"
                :key="role.id">
                {{ role.roleName }}
                <button class="btn btn-danger" @click="removeRole(role.id)">Remove</button>
            </li>
        </ul>
        <div class="input-group mt-3">
            <input type="text" class="form-control" v-model="newRole" placeholder="Enter new role">
            <button class="btn btn-primary" @click="addRole">Add Role</button>
        </div>
    </div>
</template>
  
<script>
import config from '../../../../config';

export default {

    data() {
        return {
            roles: [],
            newRole: '',
            authToken: null
        };
    },
    mounted() {
        this.authToken = this.getAuthTokenFromCookie();
        if (this.authToken) {
            this.fetchRoles();
        } else {
            console.error('No authorization token found!');
        }
    },
    methods: {
        getAuthTokenFromCookie() {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ');
            for (const cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name === 'token') {
                    return value;
                }
            }
            return null;
        },

        async fetchRoles() {
            try {
                const response = await fetch(`${config.apiUrl}/admin/roles`, {
                    headers: {
                        'Authorization': `${this.authToken}`
                    }
                });
                const data = await response.json();
                this.roles = data.allRoles;
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },
        async addRole() {
            try {
                const response = await fetch(`${config.apiUrl}/admin/role/add`, {
                    method: 'POST',
                    headers: {
                        'Authorization': this.authToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        roleName: this.newRole
                    })
                });

                if (response.ok) {
                    const data = await response.json();
   
                    console.log('Role added successfully:', data);
                    this.newRole = '';
                    await this.fetchRoles();

                } else {
                    console.error('Failed to add role:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding role:', error);
            }
        },

        async removeRole(roleId) {
    try {
        const response = await fetch(`${config.apiUrl}/admin/role/remove`, {
            method: 'POST',
            headers: {
                'Authorization': this.authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roleId: roleId
            })
        });

        if (response.ok) {
            console.log('Role removed successfully');
            await this.fetchRoles();
        } else {
            console.error('Failed to remove role:', response.statusText);
        }
    } catch (error) {
        console.error('Error removing role:', error);
    }
}

    }
};
</script>
  
<style scoped>
.container{
    margin-top: 50px;
}
</style>
  