<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <div class="navbar-brand" >{{brand}}</div>
            <button 
                class="navbar-toggler" 
                type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse"   id="navbarSupportedContent">
                 <ul v-if="isLoggedIn" class="navbar-nav mr-auto text-right">
                    <li class="nav-item">
                         <router-link to="/post" class="nav-link">fil actualité</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link  to="/profil" class="nav-link">Mon compte</router-link></li>
                    <li class="nav-item" >
                        <a class="nav-link" id="logout-btn" @click.prevent="logout">Se deconnecter</a>
                    </li>
                </ul>
                <ul v-else class="navbar-nav mr-auto text-right">
                    <li class="nav-item">
                        <router-link to="/login">Se connecter</router-link>
                    </li>
                     <li class="nav-item">
                         <router-link to="/signup">S'inscrire</router-link> 
                    </li>
                </ul>
               
            </div> 
        </div>    
    </nav>
</template>

<script>



export default {
    name: 'Nav',
      
    data () {
        return {
            brand : process.env.VUE_APP_APPNAME
        }
    },
    computed : {
        isLoggedIn() { 
            return this.$store.getters.isLogged
            },
    },
   
    methods : {
        logout() {
           
            this.$store.dispatch("logout").then(() => { 
            sessionStorage.clear();
            this.$router.push('/');
            location.reload();
            })
            .catch(() => console.log('Impossible de vous déconnecter !!'))
        }, 
    }
}
</script>

<style scoped>

 .error-message{
        background-color: rgba(233, 77, 103, 0.301);
        text-align: center;
        height:40px;
        width:90%;
        margin: auto auto 1rem auto;
        padding: .5rem;
        color: black;
    }


#logout-btn {
    color:red;
}
</style>

