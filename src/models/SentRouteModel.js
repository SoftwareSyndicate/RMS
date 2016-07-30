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

  createRoute(gymId, wallId, color="gray", grade="0", risk=0, intensity=0, complexity=0, exposure=0){
    let newRouteKey = firebase.database().ref().child(this.FIREBASE_NAME).push().key;
    let now = new Date().getTime();
    let route = {
      id: newRouteKey,
      gym_id: gymId,
      wall_id: wallId,
      created_at: now,
      updated_at: now,
      status: 0,
      color: color,
      htmlColor: color,
      grade: grade,
      risk: risk,
      intensity: intensity,
      complexity: complexity,
      exposure: exposure
    };

    var updates = {};
    updates['/' + this.FIREBASE_NAME + '/' + newRouteKey] = route;
    return firebase.database().ref().update(updates);
  }

  deleteRoute(id){
    let routesRef = firebase.database().ref(this.FIREBASE_NAME + '/' + id);
    return routesRef.remove().then(() => {
      Notifications.notify(this.NAME + ".routesUpdated");
    }).catch(error => {
      return Promise.reject(error);
    });
  }
}

export default new SentRouteModel();
