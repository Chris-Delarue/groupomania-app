<template>
    <div class="modale">
        <ModalDeleteAccount :revele="revele" :displayModale="displayModale"/>
        <button class="userProfil_btn" v-on:click="displayModale"> Supprimer mon compte </button>

    </div>
</template>


<script>


import ModalDeleteAccount from './ModalDeleteAccount';

export default {
    name: 'UserProfil',
    components :{
        ModalDeleteAccount
    },
 
    data() {
        return {
            message: null,
            errorMessage: null,
            revele: false
            
        }
    },
   

    methods : {
        
            displayModale() {
                this.revele = !this.revele
                
            }
    }
}

</script>

<style scoped>

.modale {
    display: flex;
    justify-content: center;
    margin-top:3rem;
}

.userProfil_btn{
    width:40%;
    color:  red;
    border: solid 1px red;
    border-radius: 30px;
    padding:.5rem;
    cursor: pointer;
    background-color:rgba(98, 245, 130, 0.301);
    font-size:20px;
}


</style>
