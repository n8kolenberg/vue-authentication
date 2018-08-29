<template>
 <div class="container is-centered">
   <div class="notification">
     <div class="columns">
       <div class="column is-half is-offset-one-quarter">
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input class="input is-medium " type="email" placeholder="Email">
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
            <input class="input is-medium" type="password" placeholder="Password">
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
            <button class="button is-primary">
              Login
            </button>
          </div>
        </div>
       </div>
       <div class="column is-1">
         <div class="field">
           <div class="control">
            <button class="button is-info">Sign Up</button>
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
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
