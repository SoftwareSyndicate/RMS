import Vue from 'vue'
import Router from 'vue-router'


class RouterService {
  constructor(){
    // install router
    Vue.use(Router);
  }

  initRoutes(){
    var router = new Router();

    router.map({
      // landing
      '/': {
        name: 'landing',
        hideNav: true,
        auth: false
      }
    });

    router.beforeEach(function(transition){
      Notifications.notify('Router.beforeTransition', transition);
      transition.next();
    });

    router.afterEach(function(transition){
      Notifications.notify('Router.afterTransition', transition);
    });

    return router;
  }
}

export default new RouterService();
