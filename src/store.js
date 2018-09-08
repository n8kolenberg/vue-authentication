import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import AuthAxios from './axios-auth.js'
import router from './router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },

  mutations: {
    authUser (state, userData) {
        //Authenticating the user and storing the response details from FireBase in the state object, which we'll pass down to the axios then method in the actions below
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    storeUserMutation (state, user) {
        state.user = user;
    },
    clearAuthData (state) {
        state.idToken = null;
        state.userId = null;
        state.user = null;
        console.log(state);
    }
  },

  actions: {
    signup ({commit, dispatch}, authData) {
        AuthAxios.post('/signupNewUser?key=' + process.env.DB_API_KEY, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
        })
        .then(res => {
            console.log('Sign Up Successful');
            console.log(res.data);
            commit('authUser', {
                //These variables are in the response from FireBase API calls
                token: res.data.idToken,
                userId: res.data.localId
            });
            //Apart from storing the user in the normal Authentication database of Firebase
            //We also want to store the user in our other Firebase database
            dispatch('storeUser', authData)
        });
    },

    login ({commit}, authData) {
        AuthAxios.post('/verifyPassword?key=' + process.env.DB_API_KEY, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
        .then(res => {
            console.log('Login Successful: ');
            console.log(res.data);
            commit('authUser', {
                token: res.data.idToken,
                userId: res.data.localId
            });
            //Redirecting the user to the User info page.
            router.replace("/");
        })
        .catch(error => console.log(error));
        
    },
    //This will be the action that stores the users in the 'normal' Firebase database, not in the default Firebase authentication database
    //This action should be dispatched when we get the user data, once we authenticated them
    storeUser ({commit, state}, userData) {
        if(!state.idToken) {
            return
        }
        //We have to amend the url to add ?auth= and the token stored in the state
        axios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));
    },
    fetchUser ({commit, state}) {
        if (!state.idToken) {
          return
        }
        //We have to amend the url to add ?auth= and the token stored in the state
        axios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
            console.log(res.data);
            const data = res.data;
            const users = [];
            for (let key in data) {
                const user = data[key];
                user.id = key;
                users.push(user);
            }
            console.log(users);
            commit('storeUserMutation', users[0]);
        })
    },
    logout ({commit}) {
        //Calling the clearAuthData mutation
        commit('clearAuthData');
        //We use the router to redirect the user to login page after logging out
        router.replace('/login');
    }

  },

  getters: {
    user(state) {
        return state.user;
    },
    isAuthenticated(state) {
        //If the following is null, then we don't have an authenticated user
        //If the statement below is true, then we have an authenticated user
        return state.idToken !== null;
    }

  }

});
