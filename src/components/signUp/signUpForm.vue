<template>
  <div class="sign-up-form">
    <form>
      <div class="first-name">
        <input type="text" placeholder="First Name" v-model="firstName">
      </div>

      <div class="last-name">
        <input type="text" placeholder="Last Name" v-model="lastName">
      </div>

      <div class="email">
        <input type="email" placeholder="Email" v-model="email">
      </div>

      <div class="password">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class="btn btn-primary" @click="signUp()">Sign Up</div>
    </form>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'SignInForm',
   props: {
     firstName: {
       type: String,
       default: null
     },
     lastName: {
       type: String,
       default: null
     },
     email: {
       type: String,
       default: null
     },
     password: {
       type: String,
       default: null
     },
     signUp: {}
   }
 });

</script>


<style lang="scss">
 /* @import '../../styles/main.scss'; */

 .sign-up-form {
   display: flex;
   flex-grow: 1;
   justify-content: center;

   form {
     flex-grow: 1;

     .first-name {
       display: flex;
       margin-bottom: 1rem;
     }
     .last-name {
       display: flex;
       margin-bottom: 1rem;
     }
     .email {
       display: flex;
       margin-bottom: 1rem;
     }

     .password {
       display: flex;
       margin-bottom: 1rem;
     }
   }

 }

</style>
