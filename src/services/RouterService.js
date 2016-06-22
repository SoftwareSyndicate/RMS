import Vue from 'vue'
import Router from 'vue-router'
import Notifications from 'services/NotificationService'
import UserModel from 'models/UserModel'

//Pages
import SignInPage from 'components/signInPage/signInPage'
import SignUpPage from 'components/signUpPage/signUpPage'
import SettersPage from 'components/settersPage/settersPage'
import WallsPage from 'components/wallsPage/wallsPage'
import GymPage from 'components/gymPage/gymPage'

class RouterService {
  constructor(){
    Vue.use(Router);
  }

  initRoutes(){
    var router = new Router();

    router.map({
      '/signIn': {
        name: 'signUp',
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
        component: SettersPage,
        auth: true
      },
      '/profile': {
        name: 'profile',
        component: SettersPage,
        auth: true
      },
      '/walls': {
        name: 'walls',
        component: WallsPage,
        auth: true
      },
      '/gym': {
        name: 'gym',
        component: GymPage,
        auth: true
      }

    });

    router.beforeEach(function(transition){
      if(transition.to.auth && !UserModel.currentUser){
        transition.redirect("/signIn");
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
