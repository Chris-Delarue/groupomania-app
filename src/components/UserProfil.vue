<template>
    <div class="UserProfil" >
        <div class="text">
            <h1>Bonjour {{ }}</h1>
        </div>
            
        <div class="deleteProfil" @click.prevent="deleteAccount">Supprimer votre compte</div>
    </div>
</template>

<script>


export default {
    name: 'UserProfil',
 

    data() {
        return {
            
        }
    },
  
    methods : {

        deleteAccount() {
            this.$store.dispatch("deleteAccount").then(() => {
                sessionStorage.clear();
                this.$router.push('/');
                location.reload();
            })
            .catch(() => console.log('Impossible de vous supprimer du réseau !!'))
        }
    },
}

</script>

<style scoped>

.UserProfil{
   
    width: 30%;
    height:auto;
    margin: 5rem auto;
    padding: .8rem;
}
.deleteProfil{
    color:  red;
    text-align: center;
    border: solid 1px red;
    border-radius: 30px;
    padding:.5rem;
    margin:.5rem auto;
}
.text {
    
}

</style>
