<template>
    <div class='nav-container'>
        <router-link to='/'>
             <h1>
                <img src="/assets/images/icon-above-font.png" alt="Logo Groupomania" aria-hidden= true>
            </h1>
        </router-link>

        <nav>
            <router-link to="/profil">
            <div>Mon compte chez Groupomania</div>
            </router-link>
            <div id="logout-btn" @click = logout()>Se déconnecter</div>
        </nav>
    </div>
</template>

<script>


export default {
    name:  'Nav',

    methods : {
        logout(){
            localStorage.removeItem('user');
            location.href="/";
        }
    }
}
</script>



