<template>
  <div id="app">
    <app-header></app-header>
    <app-logo></app-logo>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Logo from './components/Logo.vue';

export default {
  name: 'App',
  data() {
    return {
      data: ''
    }
  },
  components: {
    appHeader: Header,
    appLogo: Logo
  },
  created() {
    //Going to check if the user was logged in and if so and they refresh the browser, they should stay logged in
    this.$store.dispatch('tryAutoLogin');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0
  }
  to {
    transform: translateY(0);
    opacity: 1
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1
  }
  to {
    transform: translateY(-30px);
    opacity: 0
  }
}


</style>
