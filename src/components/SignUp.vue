<template>
 <div class="container is-centered">
   <h2>Please Sign Up</h2>
   <br>
   <div class="notification">
     <div class="columns">
       <div class="column is-half is-offset-one-quarter">
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input class="input is-medium " type="email" placeholder="Email" v-bind="email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
       </div>     
     </div> <!-- End columns -->

     <div class="columns">
       <div class="column is-half is-offset-one-quarter">
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input class="input is-medium" type="password" placeholder="Password" v-bind="password">
            <span class="icon is-small is-left">
              <i class="fas fa-unlock-alt"></i>
            </span>
          </div>
        </div>
      </div>
     </div>

     <div class="columns">
       <div class="column is-1 is-offset-one-quarter">
         <div class="field">
           <div class="control">
            <button class="button is-primary" @click="signup">Sign Up</button>
           </div>
         </div>
       </div>

     </div> <!--End columns -->

   </div> <!--End notification div -->
 </div> <!-- End container div -->
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
      signup() {
          console.log("Signing up");
          let formData = {
              email: this.email,
              password: this.password
          };
          console.log(formData);
          axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=', {
              email: formData.email,
              password: formData.password,
              returnSecureToken: true,
          })
          .then( res => console.log(res.data));
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
