<template>
    <div class="Userprofil">
        <div class="infoProfil">
            <h1>Bonjour</h1>
            <h2>{{this.$user.firstname}},</h2>
        </div>

        <div class="deleteProfil" @click.prevent="deleteAccount">Supprimer votre compte</div>
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
.deleteProfil{
    color:  red;
    cursor: pointer;
}

</style>
