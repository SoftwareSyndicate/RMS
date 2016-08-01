import Notifications from '../services/NotificationService'

class SentRouteModel {
  constructor(){
    this.NAME = "SentRouteModel";
    this.FIREBASE_NAME = "sent_routes";
    this.routes = [];
  }

  watchAllRoutesInGym(gymId){
    this.routesRef = firebase.database().ref(this.FIREBASE_NAME).orderByChild("gym_id").equalTo(gymId);
    this.routesRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key]);
      }
      Notifications.notify(this.NAME + ".routesUpdated");
    });
  }

  watchAllRoutesByUserId(userId){
    this.routesRef = firebase.database().ref(this.FIREBASE_NAME).orderByChild("user_id").equalTo(gymId);
    this.routesRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key]);
      }
      Notifications.notify(this.NAME + ".routesUpdated");
    });
  }

  watchAllRoutesByUserId(userId){
    this.routesRef = firebase.database().ref(this.FIREBASE_NAME).orderByChild("user_id").equalTo(userId);
    this.routesRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key]);
      }
      /* console.log(this.NAME + "routesUpdated");
         console.log(this.routes); */
      Notifications.notify(this.NAME + ".routesUpdated");
    });
  }


  watchAllRoutes(){
    this.routesRef = firebase.database().ref(this.FIREBASE_NAME).orderByChild("gym_id");
    this.routesRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key]);
      }
      Notifications.notify(this.NAME + ".routesUpdated");
    });
  }


  updateRoute(route){
    var updates = {};
    updates['/' + this.FIREBASE_NAME + '/' + route.id] = route;
    return firebase.database().ref().update(updates);
  }

  getRoutesByWallId(id){
    this.routesRef = firebase.database().ref(this.FIREBASE_NAME).orderByChild("wall_id").equalTo(id);
    this.routesRef.on('value', data => {

      this.routes = [];
      for(var key in data.val()){
        this.routes.push(this.parseRoute(data.val()[key]))
      }
      Notifications.notify(this.NAME + ".routesUpdated");
    });
  }

  parseRoute(route){
    route.last_set = new Date(route.last_set);
    route.created_at = new Date(route.created_at);
    route.updated_at = new Date(route.updated_at);
    return route;
  }

  createSentRoute(routeId, userId){
    let newKey = firebase.database().ref().child(this.FIREBASE_NAME).push().key;
    let now = new Date().getTime();
    let sentRoute = {
      id: newKey,
      route_id: routeId,
      user_id: userId,
      created_at: now,
      updated_at: now,
    };

    var updates = {};
    updates['/' + this.FIREBASE_NAME + '/' + newKey] = sentRoute;
    return firebase.database().ref().update(updates);
  }

  deleteSentRoute(id){
    let ref = firebase.database().ref(this.FIREBASE_NAME + '/' + id);
    return ref.remove().then(() => {

    }).catch(error => {
      return Promise.reject(error);
    });
  }
}

export default new SentRouteModel();
