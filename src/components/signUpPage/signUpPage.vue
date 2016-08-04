<template>
  <div class="sign-up-page">
    <div class="form-container">
      <h2>Sign Up</h2>
      <form>
        <input type="email" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div class="btn btn-primary" @click="signUpWithEmail()">Sign up with Email</div>
      </form>
      <div class="seperator-container">
        <div class="seperator"></div>
        <span>or</span>
        <div class="seperator"></div>
      </div>
      <div class="third-party-login-container">
        <div class="facebook" @click="signUpWithFacebook()">
          <p>Sign up with Facebook</p>
        </div>
        <div class="google" @click="signUpWithGoogle()">
          <p>Sign up with Google</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'SignUpPage',
   components: {

   },
   data(){
     return {
       email: "",
       password: ""
     }
   },

   created(){

   },

   ready(){
     this.notifications.notify("Navbar.setItems", {display: "Sign In", route: "signIn"});
   },

   notifs(){
     return {

     }
   },
   methods: {
     signUpWithEmail(){
       UserModel.signUpWithEmail(this.email, this.password).then(results => {
         console.log(results);
       });
     },

     signUpWithFacebook(){
       UserModel.signUpWithFacebook();
     },

     signUpWithGoogle(){
       UserModel.signUpWithGoogle();
     }
   }
 });


</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .sign-up-page {
   display: flex;
   flex-basis: 100%;
   justify-content: center;

   .form-container {
     padding: 3em;
     margin-top: 6em;
     background-color: $color-sub-container;

     color: $color-text-secondary;

     h2 {
       font-weight: 300;
       padding-bottom: 1em;
     }

     form {
       display: flex;
       flex-wrap: wrap;

       input {
         flex-basis: 100%;
         margin-bottom: 10px !important;
       }

       .btn {
         flex-basis: 100%;
         width: 100%;
       }
     }

     .seperator-container {
       margin-top: 20px;
       margin-bottom: 20px;
       display: flex;

       span {
         padding-left: 10px;
         padding-right: 10px;
         color: rgba(0, 0, 0, .6);
       }

       .seperator {
         margin: 10px 0px 10px 0px;
         width: 100%;
         height: 1px;
         background-color: rgba(0, 0, 0, .2);
       }
     }

     .third-party-login-container {
       display: flex;
       flex-wrap: wrap;

       .facebook {
         margin-bottom: 10px;
         display: flex;
         flex-basis: 100%;
         height: 52px;
         color: white;
         background-color: #3b5998;
         background-image: url("/images/facebook-20-20.svg");
         background-repeat: no-repeat;
         background-position: 20px 50%;
         align-items: center;
         justify-content: center;

         &:hover {
           background-color: darken(#3b5998, 4%);
         }
       }

       .google {
         display: flex;
         flex-basis: 100%;
         height: 52px;
         color: white;
         background-color: #3cba54;
         background-image: url("/images/google-20-20.svg");
         background-repeat: no-repeat;
         background-position: 20px 50%;
         align-items: center;
         justify-content: center;

         &:hover {
           background-color: darken(#3cba54, 4%);
         }
       }

     }
   }
 }

</style>
