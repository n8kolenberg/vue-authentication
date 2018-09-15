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
            <input class="input is-medium " :class="{'invalidate': $v.email.$error, 'is-success': !$v.email.$invalid }" id="email" type="email" placeholder="Email" v-model="email"
              @blur="$v.email.$touch()"
            > <!--$v and $touch are coming from the validator through vuelidate--> <!--You an check this with {{$v}}-->
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>

          <div v-if="!$v.email.email" class="notification is-danger">  
            <p>
              <span class="icon is-small">
                <i class="fas fa-exclamation-circle"></i>
              </span>
              <span>Please enter a valid email address</span>
            </p>
          </div>
          
        </div>
       </div>     
     </div> <!-- End columns -->

    <div class="columns">
       <div class="column is-half is-offset-one-quarter">
        <div class="field">
          <label class="label">Age</label>
          <div class="control has-icons-left">
            <input class="input is-medium " :class="{'invalidate': $v.age.$error, 'is-success': !$v.age.$invalid }" type="text" placeholder="Age" v-model.number="age"
              @blur="$v.age.$touch()"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-birthday-cake"></i>
            </span>
          </div>
          <div v-if="!$v.age.minVal" class="notification is-danger">  
            <p>
              <span class="icon is-small">
                <i class="fas fa-exclamation-circle"></i>
              </span>
              <span>You have to be {{$v.age.$params.minVal.min}} or older to sign up</span>
            </p>
          </div>

          <div v-if="!$v.age.numeric" class="notification is-danger">  
            <p>
              <span class="icon is-small">
                <i class="fas fa-exclamation-circle"></i>
              </span>
              <span>Please enter a numerical value</span>
            </p>
          </div>
        </div>
       </div>     
     </div> <!-- End columns -->


     <div class="columns">
       <div class="column is-half is-offset-one-quarter">
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input class="input is-medium" type="password" placeholder="Password" v-model="password"
              @blur="$v.password.$touch()"
              :class="{'invalidate': $v.password.$error, 'is-success': !$v.password.$invalid }"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-unlock-alt"></i>
            </span>
          </div>
          <div v-if="!$v.password.minLen" class="notification is-danger">  
            <p>
              <span class="icon is-small">
                <i class="fas fa-exclamation-circle"></i>
              </span>
              <span>Please enter a password of at least {{$v.password.$params.minLen.min}} characters</span>
            </p>
          </div>
        </div>
      </div>
     </div> <!--End Columens-->

     <div class="columns">
       <div class="column is-half is-offset-one-quarter">
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control has-icons-left">
            <input class="input is-medium"  type="password" placeholder="Confirm Password" v-model="confirmPassword"
              @change="$v.confirmPassword.$touch()"
              :class="{'invalidate': $v.confirmPassword.$error, 'is-success': !$v.confirmPassword.$invalid }"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-check-double"></i>
            </span>
          </div>
          <div v-if="!$v.confirmPassword.sameAs" class="notification is-danger">  
            <p>
              <span class="icon is-small">
                <i class="fas fa-exclamation-circle"></i>
              </span>
              <span>This needs to be the same as your password</span>
            </p>
          </div>
        </div>
       </div>     
     </div> <!-- End columns -->

     <div class="columns">
       <div class="column is-1 is-offset-one-quarter">
         <div class="field">
           <div class="control">
            <button class="button is-primary" @click="signup" :disabled="$v.$invalid">Sign Up</button>
           </div>
         </div>
       </div>

     </div> <!--End columns -->

   </div> <!--End notification div -->
 </div> <!-- End container div -->
</template>

<script>
import { required, email, numeric, minValue, minLength, sameAs } from 'vuelidate/lib/validators' //full list can be found on vuelidate documentation page
import axios from 'axios'

export default {
  data () {
    return {
      email: "",
      age: null,
      password: "",
      confirmPassword: ""
    }
  },
  //This is possible through vuelidate package
  validations: {
    email: {
      required,
      email, //ES6 syntax
      unique: value => {
        if(value === '') return true;
        return axios.get('/users.json?orderBy="email"&equalTo="' + value + '"') //The url is specific to FireBase
        .then(res => {
          console.log(res.data);
          //We check if the DB returns a user object
          //We then check if this object has any keys - if so, we invalidate and vice versa
          return Object.keys(res.data).length === 0 ? true : false;
        });
        }
      }, //has to have the same name as the property defined in data(){}
    age: {
      required,
      numeric,
      minVal: minValue(18)//Minimum age will be 18 otherwise it will be invalid input
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      // sameAs: sameAs('password') This is the same as doing the below but allows you to check with more flexibility
      sameAs: sameAs(vm => {
        return vm.password
      })
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
          this.$store.dispatch('signup', {email: formData.email, password: formData.password});
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

.invalidate {
  border: #ff3860 2px solid
}
</style>
