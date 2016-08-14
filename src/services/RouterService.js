import Vue from 'vue'
import Router from 'vue-router'
import Notifications from 'services/NotificationService'
import UserModel from 'models/UserModel'

//Pages
import UserPage from 'components/userPage/userPage'
import UsersPage from 'components/usersPage/usersPage'
import ProfilePage from 'components/profilePage/profilePage'
import WallsPage from 'components/wallsPage/wallsPage'
import WallPage from 'components/wallPage/wallPage'
import GymPage from 'components/gymPage/gymPage'
import GymsPage from 'components/gymsPage/gymsPage'
import NotificationsPage from 'components/notificationsPage/notificationsPage'


//Sign In
import SignInPage from 'components/signIn/signInPage.vue'

//Sign Up
import SignUpPage from 'components/signUp/signUpPage.vue'


class RouterService {
  constructor(){
    Vue.use(Router);
  }

  initRoutes(){
    var router = new Router();

    router.map({
      //Sign In
      '/signIn': {
        name: 'signIn',
        component: SignInPage,
        auth: false,
      },
      //Sign Up
      '/signUp': {
        name: 'signUp',
        component: SignUpPage,
        auth: false,
      },
      '/users': {
        name: 'users',
        component: UsersPage,
        auth: "admin"
      },
      '/users/:id': {
        name: 'profile',
        component: UserPage,
        auth: "admin"
      },
      '/walls': {
        name: 'walls',
        component: WallsPage,
        auth: "setter"
      },
      '/walls/:id': {
        name: 'wall',
        component: WallPage,
        auth: "setter"
      },
      '/gyms': {
        name: 'gyms',
        component: GymsPage,
        auth: "admin"
      },
      '/notifications': {
        name: 'notifications',
        component: NotificationsPage,
        auth: "admin"
      },
      '/gyms/:id': {
        name: 'gym',
        component: GymPage,
        auth: "setter"
      }

    });

    router.beforeEach(function(transition){
      if(transition.to.auth && !UserModel.firebaseUser){
        transition.redirect("/signIn");
      } else if(!transition.to.auth && UserModel.firebaseUser){
        transition.redirect("/gyms");
      } else {
        Notifications.notify('Router.beforeTransition', transition);
        transition.next();
      }
    });

    router.afterEach(function(transition){
      Notifications.notify('Router.afterTransition', transition);
    });


    router.redirect({
      '*': '/gyms'
    });


    return router;
  }
}

export default new RouterService();
