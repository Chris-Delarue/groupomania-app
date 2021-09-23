<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <div class="blocNamelogo">
                <div class="navbar-brand" > {{ brand }}</div>
                <div class="nav-name" v-if="User" > 
                <h1  class="nav-nameText">Bonjour {{ User }} </h1></div>
            </div>
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
                         <router-link to="/" class="nav-link">fil actualité</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link  to="/profil" class="nav-link">Mon compte</router-link></li>
                    <li class="nav-item" >
                        <a class="nav-link" id="logout-btn" @click.prevent="logout">Se deconnecter</a>
                    </li>
                </ul>
                <ul v-else class="navbar-nav mr-auto  text-right text-right-notin ">
                    <li class="nav-item">
                        <router-link class="textRouter" to="/login">Se connecter</router-link>
                    </li>
                     <li class="nav-item">
                         <router-link class="textRouter" to="/signup">S'inscrire</router-link> 
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
            brand : process.env.VUE_APP_APPNAME,
          
        }
    },
    
    computed : {

        isLoggedIn() { 
            return this.$store.getters.isLogged
        },
            
    },
   
    methods : {

        logout(){
        
        return this.$store.dispatch('logout'),
        
        this.$router.push({ name: 'Login'}).catch(() =>{})
       
        },
        
               
       
    },
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

.nav-name {
    color: white;
}
.textRouter{
    text-decoration:  none;
    color: green;
}
.nav-nameText{
    font-size: 15px;
}
/*.text-right-notin{
    margin: auto;;
    width: 30%;
    display : flex;
    justify-content: space-between
}*/
nav-link {
    width: fit-content;
    float:right;
}
#logout-btn {
    color:red;
    cursor: pointer;
}
@media screen and (max-width:680px) {

.blocNamelogo {
    display: flex-flow;
}

.navbar-brand {
    font-size: 15px;
    
}

.nav-nameText{
    font-size: 15px;
    
}
}
</style>

