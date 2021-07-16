<template>
    <div class="profil">
        <LoginForm v-if="!loggedIn"/>

        <!--<Nav v-if="loggedIn"/>-->
        <UserProfil v-if="loggedIn"/>
      
    </div>
</template>

<script>

import LoginForm from'@/components/LoginForm.vue';
//import Nav from '@/components/Nav.vue';
import UserProfil from '@/components/UserProfil.vue';


export default {
    name : 'Profil',
    components : {
        LoginForm,
        //Nav,
        UserProfil
       
    },
    data() {
        return {
            loggedIn : true
        }
    },
    created() {
        this.checkLoggedInOk()
    },
    methods : {
        checkLoggedInOk() {
            if(localStorage.user !== undefined) {
                this.loggedIn = true;
                console.log('Utilisateur connecté !')
            }
            else if(localStorage.user == undefined) {
                this.loggedIn = false;
                console.log('Utilisateur non connecté !')
            }
        }
    }
}

</script>
