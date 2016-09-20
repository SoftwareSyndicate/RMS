<template>
  <div class="setter-list-item">
    <div class="header">
      <div class="avatar">
        <img :src="tempAvatar">
      </div>
      <div class="name">
        <span>{{setter.first_name + ' ' + setter.last_name}}</span>
      </div>
      <div class="active-switch">
        <!-- checkbox here -->
        <!-- <input type="checkbox" id="sent-switch-checkbox-{{route.id}}" v-model="setter.active"/> -->
      </div>
    </div>
    <div class="body">
      <div class="setter-stat">
        <span>Date Last Set: </span><span class="number">{{setter.lastSet | dateSet}}</span>
      </div>
      <div class="setter-stat">
        <span>Routes Set: </span><span class="number">{{setter.routes.length + setter.previous_routes}}</span>
      </div>
      <div class="setter-stat">
        <span>Avg Grade: </span><span class="number">{{setter.avgGrade}}</span>
      </div>
      <div class="setter-stat">
        <span>Favorite Color: </span>
        <span class="number">{{setter.favoriteColor.color}}</span>
        <span class="color" :style="{'background-color': setter.favoriteColor.hex}">&nbsp</span>
      </div>
    </div>
    <div class="footer">
      <div class="divider"></div>
      <span v-link="{name: 'setter', params: {id: setter.id}}">View Details - Comming Soon!</span>
    </div>
  </div>
</template>

<script>
 import BaseComponent from 'base/baseComponent.vue'

 export default BaseComponent.extend({
   name: 'SetterListItem',
   props: {
     setter: {
       type: Object,
       default: () => {},
       twoWay: true
     }
   },
   components: {

   },
   data(){
     return {
       tempAvatar: ""
     }
   },
   created(){
     let rando = this.setter.created_at % 255;
     this.tempAvatar = "https://api.adorable.io/avatars/50/" + rando + "@adorable.io.png";
   },

   methods: {

   }
 });

</script>


<style lang="scss">

 $name-color: rgba(0, 0, 0, .6) !default;

 .setter-list-item {
   display: flex;
   flex-basis: 100%;
   flex-wrap: wrap;

   background-color: white;

   .header {
     background-color: rgba(248, 249, 255, 1);
     padding: .8rem;
     display: flex;
     flex-basis: 100%;
     align-items: center;
     border-bottom: 1px solid rgba(0, 0, 0, .1);

     .avatar {
       padding-right: 1rem;
       height: 30px;
       width: 30px;

       img {
         border-radius: 50%;
         height: 30px;
         width: 30px;
       }
     }

     .name {
       span {
         font-size: .9rem;
         font-weight: 600;
         color: $name-color;
       }
     }

     .active-switch {
       margin-left: auto;
     }
   }

   .body {
     display: flex;
     flex-basis: 100%;
     padding: .5rem;
     flex-wrap: wrap;

     .setter-stat {
       display: flex;
       flex-basis: 100%;
       align-items: center;
       margin-bottom: .5rem;

       span {
         display: flex;
         align-items: center;
         font-size: .8rem;
         color: lighten($name-color, 20%);
         font-weight: 600;

         &.number {
           color: darken($name-color, 20%);
           margin-left: auto;

         }

         &:first-letter {
           text-transform:capitalize;
         }

         &.color {
           height: 10px;
           width: 10px;
           border-radius: 50%;
           background-color: black;
           margin-left: 5px;
         }
       }
     }
   }

   .footer {
     display: flex;
     flex-basis: 100%;
     padding: .5rem;
     flex-wrap: wrap;

     .divider {
       flex-basis: 100%;
       border-top: 2px solid rgba(0, 0, 0, .05);
       padding-bottom: .8rem;
     }

     span {
       font-size: .7rem;
       color: #FA7535;
       text-decoration: underline;
       cursor: pointer;
       padding-bottom: .8rem;
     }
   }
 }

</style>
