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
    //Firebase's idToken is only valid for 3600 seconds (1hour) and so we need to log the user out automatically
    //Once the token has expired - we're going to dispatch this in the login action
    setLogoutTimer ({commit, dispatch}, expirationTime) {
        setTimeout(() => {
            dispatch('logout');
        }, expirationTime * 1000);
    },
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
            //We can't just pass the expiresIn data to the localStorage because it will be 3600 seconds from the moment we reload
            //That's why we have to calculate the moment the session expires and save that in localStorage
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
            //We're going to store the idToken in the browser's localStorage so we can send it to the backend and keep the user signed in
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('expirationDate', expirationDate)


            //Apart from storing the user in the normal Authentication database of Firebase
            //We also want to store the user in our other Firebase database 
            //And we call the storeUser action to do so
            dispatch('storeUser', authData)
            //After Firebase's idToken expires, we need to log the user out
            dispatch('setLogoutTimer', res.data.expiresIn);
        });
    },

    login ({commit, dispatch}, authData) {
        AuthAxios.post('/verifyPassword?key=' + process.env.DB_API_KEY, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
        .then(res => {
            //We can't just pass the expiresIn data to the localStorage because it will be 3600 seconds from the moment we reload
            //That's why we have to calculate the moment the session expires and save that in localStorage
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
            //We're going to store the idToken in the browser's localStorage so we can send it to the backend and keep the user signed in
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('expirationDate', expirationDate)

            console.log('Login Successful: ');
            console.log(res.data);
            commit('authUser', {
                token: res.data.idToken,
                userId: res.data.localId
            });
            //Redirecting the user to the User info page.
            router.replace("/");
            //After Firebase's idToken expires, we need to log the user out
            dispatch('setLogoutTimer', res.data.expiresIn);
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
    //This method will be used to initially fetch the user once they're authenticated
    //Right now it takes the first user in the array statically.
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
            console.log("User fetched:");
            console.log(users);
            commit('storeUserMutation', users[0]);
        })
    },

    tryAutoLogin({commit}) {
        const token = localStorage.getItem('token');
        if(!token) {
            return
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if(now >= expirationDate) {
            return 
        } 
        const userId = localStorage.getItem('userId');
        commit('authUser', {
            token: token,
            userId: userId
        })

    },

    logout ({commit}) {
        //Calling the clearAuthData mutation
        commit('clearAuthData');
        //Removing the data from the localStorage when the user logs out
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
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
