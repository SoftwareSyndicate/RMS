<template>
  <div class="sign-in-page">
    <div class="sign-in-form-container">
      <sign-in-form :email.sync="email" :password.sync="password" :sign-in="signIn"></sign-in-form>
      <p class="error-message" v-if="error">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import SignInForm from 'components/signIn/signInForm'

 export default BaseComponent.extend({
   name: 'SignInPage',
   components: {
     SignInForm
   },
   data(){
     return {
       email: "",
       password: "",
       error: false,
       errorMessage: ""
     }
   },
   created(){

   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Sign In");
   },
   notifs(){
     return {

     }
   },
   methods: {
     signIn(){
       this.error = false;
       UserModel.signInWithEmail(this.email, this.password).then(results => {
         this.$router.go({"name": "gym"});
       }, error => {
         this.error = true;
         this.errorMessage = error.message;
       });
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .sign-in-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   justify-content: center;
   margin-top: $page-margin-top;
   text-align: center;

   .sign-in-form-container {
     margin-top: 4rem;
     width: 40%;
   }

   .error-message {
     color: #FC575E;
   }
 }

</style>
