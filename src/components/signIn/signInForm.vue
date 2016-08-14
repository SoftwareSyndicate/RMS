<template>
  <div class="sign-in-form">
    <form>
      <div class="email">
        <input type="email" placeholder="Email" v-model="email">
      </div>
      <div class="password">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class="btn btn-primary" @click="signIn()">Sign In</div>
    </form>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'
 import UserModel from 'models/UserModel'

 export default BaseComponent.extend({
   name: 'SignInForm',
   props: {
     email: {
       type: String,
       default: null
     },
     password: {
       type: String,
       default: null
     },
     signIn: {

     }
   }
 });

</script>


<style lang="scss">
 /* @import '../../styles/main.scss'; */

 .sign-in-form {
   display: flex;
   flex-grow: 1;
   justify-content: center;

   form {
     flex-grow: 1;

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
