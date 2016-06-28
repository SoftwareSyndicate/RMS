import Vue from 'vue'
import Router from 'vue-router'
import Notifications from 'services/NotificationService'
import UserModel from 'models/UserModel'

//Pages
import SignInPage from 'components/signInPage/signInPage'
import SignUpPage from 'components/signUpPage/signUpPage'
import ProfilePage from 'components/profilePage/profilePage'
import WallsPage from 'components/wallsPage/wallsPage'
import WallPage from 'components/wallPage/wallPage'
import GymPage from 'components/gymPage/gymPage'
import GymsPage from 'components/gymsPage/gymsPage'

class RouterService {
  constructor(){
    Vue.use(Router);
  }

  initRoutes(){
    var router = new Router();

    router.map({
      '/signIn': {
        name: 'signIn',
        component: SignInPage,
        auth: false
      },
      '/signUp': {
        name: 'signUp',
        component: SignUpPage,
        auth: false
      },
      '/setters': {
        name: 'setters',
        component: ProfilePage,
        auth: "setter"
      },
      '/profile': {
        name: 'profile',
        component: ProfilePage,
        auth: "setter"
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
      '/gyms/:id': {
        name: 'gym',
        component: GymPage,
        auth: "setter"
      }

    });

    router.beforeEach(function(transition){
      console.log(UserModel.currentUser);
      if(transition.to.auth && !UserModel.currentUser){
        transition.redirect("/signIn");
      } else if(!transition.to.auth && UserModel.currentUser){
        transition.redirect("/gym");
      } else {
        Notifications.notify('Router.beforeTransition', transition);
        transition.next();
      }
    });

    router.afterEach(function(transition){
      Notifications.notify('Router.afterTransition', transition);
    });


    router.redirect({
      '*': '/gym'
    });


    return router;
  }
}

export default new RouterService();
