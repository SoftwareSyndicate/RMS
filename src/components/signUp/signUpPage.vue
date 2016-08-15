<template>
  <div class="sign-up-page">
    <div class="sign-up-form-container">
      <sign-up-form :email.sync="email" :password.sync="password" :sign-up="signUp" :first-name.sync="firstName" :last-name.sync="lastName"></sign-up-form>
      <p class="error-message" v-if="error">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'
 import SignUpForm from 'components/signUp/signUpForm'

 export default BaseComponent.extend({
   name: 'SignUpPage',
   components: {
     SignUpForm
   },
   data(){
     return {
       firstName: "",
       lastName: "",
       email: "",
       password: "",
       error: false,
       errorMessage: ""
     }
   },
   created(){

   },

   ready(){
     this.notifications.notify("Navbar.setHeader", "Sign Up");
     let navItems = [{
       display: "Sign In",
       route: "signIn",
       auth: "none"
     }];

     this.notifications.notify("Navbar.setItems", navItems);
   },
   methods: {
     signUp(){
       this.error = false;
       if(this.firstName === "" || this.lastName === "" || this.email === "" || this.password === ""){
         this.error = true;
         this.errorMessage = "All fields required";
       } else {
         UserModel.signUpWithEmail(this.email, this.password).then(results => {
           UserModel.firebaseUser = firebase.auth().currentUser;
           UserModel.createUser(UserModel.firebaseUser.uid, this.firstName, this.lastName).then(results => {
             UserModel.watchCurrentUser(UserModel.firebaseUser.uid);
             this.$router.go({name: 'profile'});
           }, error => {
           })
         }, error => {
           this.error = true;
           this.errorMessage = error.message;
         });
       }
     }
   }
 });

</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .sign-up-page {
   display: flex;
   flex-wrap: wrap;
   flex-grow: 1;
   justify-content: center;
   margin-top: $page-margin-top;
   text-align: center;

   .sign-up-form-container {
     margin-top: 4rem;
     width: 40%;
   }

   .error-message {
     color: #FC575E;
   }
 }

</style>
