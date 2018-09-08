<template>
    <div>
        <h2>Welcome to this Authentication app with Vue.js</h2>
        <h2>You should only be able to get here if you're authenticated!</h2>
        <h3 v-if="email">Your Email: {{email}} </h3>
    </div>
</template>

<script>
export default {
    computed: {
        email() {
            return !this.$store.getters.user ? false : this.$store.getters.user.email;
        }
    },
    created() {
        //As soon as this component is created, we need to fetch the user
        this.$store.dispatch('fetchUser');
    }
}
</script>

<style>

</style>

