<template>
    <div class="login">
        <LoginForm/>
    </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue';

export default {
    name: 'Signup',

    components : {
        LoginForm
    },
}
</script>