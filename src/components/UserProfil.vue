<template>
    <div class="UserProfil">
        <div class="infoProfil">
            <h1 class="text-Uprofil">Bonjour {{this.$user.firstname}},</h1>
        </div>
        <div class="deleteProfil">
            <a  class="textDelete" @click.prevent="deleteAccount">Supprimer votre compte</a>
        </div>
    </div>
</template>

<script>

import axios from 'axios' ;


export default {
    mane: 'UserProfil',

    methods : {
        deleteAccount() {

            const userId = this.$user.userId;

            axios.delete(`${this.apiUrl}/auth/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.$token}`
                }
            })
            .then(localStorage.removeItem('user'))
            .then(location.href = "/");

        }
    }
    
}
</script>

<style scoped>

.UserProfil{
    margin-top:2rem;
}
.infoProfil{
    margin: auto;
}
a {
    cursor: pointer;
}
.deleteProfil{
    color: red;
    margin-bottom: 2rem;
}

</style>
