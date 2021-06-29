<template>
    <div class='nav-containner'>
        <router-link to='/'>
             <h1>
                <img src="/assets/images/icon-left-font.png" alt="Logo Groupomania">
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
    name:  'nav-container',
    methods : {
        logout(){
            localStorage.removeItem('user');
            location.href="/";
        }
    }
}
</script>

<script>

</script>

