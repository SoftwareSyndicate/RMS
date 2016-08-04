<template>
  <div class="sign-in-page">
    <div class="component form-container">
      <h2>Sign In</h2>
      <form>
        <input type="email" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <div class="btn btn-primary" @click="signInWithEmail()">Sign in with Email</div>
        <div class="error" v-if="error">Invalid Credentials</div>
      </form>
      <div class="seperator-container">
        <div class="seperator"></div>
        <span>or</span>
        <div class="seperator"></div>
      </div>
      <div class="third-party-login-container">
        <div class="facebook" @click="signInWithFacebook()">
          <p>Sign in with Facebook</p>
        </div>
        <div class="google" @click="signInWithGoogle()">
          <p>Sign in with Google</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'SignInPage',
   components: {

   },
   data(){
     return {
       email: "",
       password: "",
       error: null
     }
   },
   created(){

   },

   notifs(){
     return {

     }
   },
   methods: {
     signInWithEmail(){
       this.error = false;
       UserModel.signInWithEmail(this.email, this.password).then(results => {
         if(results.code){
           this.error = true;
         } else {
           this.$router.go({"name": "gym"});
         }
       });
     },

     signInWithFacebook(){
       UserModel.signUpWithFacebook();
     },

     signInWithGoogle(){
       UserModel.signUpWithGoogle();
     }
   }
 });


</script>


<style lang="scss">
 @import '../../styles/main.scss';

 .sign-in-page {
   display: flex;
   flex-basis: 100%;
   justify-content: center;

   .form-container {
     width: 50%;
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

       .error {
         padding-top: 1.5em;
         flex-basis: 100%;
         width: 100%;
         color: red;
         text-align: center;
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
