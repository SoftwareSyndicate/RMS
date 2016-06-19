import Vue from 'vue'
import Router from 'vue-router'
import Notifications from './NotificationService'

//Pages
import SignUpPage from 'components/signUpPage/signUpPage'

class RouterService {
  constructor(){
    // install router
    Vue.use(Router);
  }

  initRoutes(){
    var router = new Router();

    router.map({
      '/signUp': {
        name: 'signUp',
        component: SignUpPage,
        auth: false
      },
      '/setters': {
        name: 'setters',
        component: SignUpPage,
        auth: true
      },
      '/walls': {
        name: 'walls',
        component: SignUpPage,
        auth: true
      },
      '/gym': {
        name: 'gym',
        component: SignUpPage,
        auth: true
      }

    });

    router.beforeEach(function(transition){
      Notifications.notify('Router.beforeTransition', transition);
      transition.next();
    });

    router.afterEach(function(transition){
      Notifications.notify('Router.afterTransition', transition);
    });


    router.redirect({
      '*': '/signUp'
    });


    return router;
  }
}

export default new RouterService();
