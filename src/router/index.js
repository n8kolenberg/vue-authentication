import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Home from '../components/Home'
import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      //Navigation guard
      beforeEnter (to, from, next) {
        //only if we have a token, is the user authenticated
        if(store.state.idToken) {
          //if we have a valid token, the navigation can continue
          next();
        } else {
          //If we don't have a valid token, we redirect the user to the login page
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
