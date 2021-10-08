<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <div class="blocNameLogo">
                <div class="navbar-brand" > {{ brand }}</div>
                <ul v-if="isLoggedIn" class="navbar-nav mr-auto text-right">
                     <h1  class="nav-textLoggedIn">Bonjour {{ $store.state.user.firstname }} </h1>
                </ul>
                <h2 v-else class="nav-textLogout">Bonjour</h2>
            </div>
            <button 
                class="navbar-toggler" 
                type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse"   id="navbarSupportedContent">
                 <ul v-if="isLoggedIn" class="navbar-nav mr-auto text-right text-right-in">
                     
                    <li class="nav-item">
                         <router-link to="/" class="nav-link textRouterIn">fil d'actualité</router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link  to="/profil" class="nav-link textRouterIn">Mon compte</router-link></li>
                    <li class="nav-item" >
                        <a class="nav-link" id="logout-btn" @click.prevent="logout">Se deconnecter</a>
                    </li>
                </ul>
                <ul v-else class="navbar-nav mr-auto  text-right text-right-notin ">
                    <li class="nav-item">
                        <router-link class="textRouterOut" to="/login">Se connecter</router-link>
                    </li>
                     <li class="nav-item">
                         <router-link class="textRouterOut" to="/signup">S'inscrire</router-link> 
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
        this.$router.push({ name: 'Home'}).catch(()=>{})
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
.blocNameLogo {
    display: flex wrap;
    height: auto;
    width: auto;
    
}
.navbar-brand {
    font-size: 20px;
    margin:0;
}

.nav-textLogout {
    display:flex;
    color: green;
    font-size:20px;
}
.textRouterIn {
    padding:.5rem;
    text-decoration:  none;
    color: green;
    font-size:20px;
    width: fit-content;
}
.textRouterOut{
    padding: .5rem;
    text-decoration:  none;
    color: green;
    font-size:20px;
    width: fit-content;
}
.nav-textLoggedIn{
    color: green;
    margin: 0 ;
}
.text-right-in {
    margin-left: 5rem;
    width: fit-content;
    float: right;
    font-size:20px;
}
.text-right-notin{
    float: right;
    width: fit-content;
    margin-left: 10rem;
}
#logout-btn {
    color:red;
    cursor: pointer;
}
@media screen and (max-width:680px) {

.nav-textLogout {
    font-size: 20px;
    display: flex;
}

.textRouterIn {
    font-size: 15px;
    padding:.5rem;
   
}
#logout-btn {
    font-size : 15px;
}
.text-right-in {
    margin: 0;
}
.textRouterOut {
    font-size: 15px;
}

.text-right-notin{
    width: fit-content;
    
}
.nav-textLoggedIn{
    font-size: 20px;
}
}
</style>

