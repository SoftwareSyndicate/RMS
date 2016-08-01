import Notifications from '../services/NotificationService'

class RouteModel {
  constructor(){
    this.routes = [];
    this.sentRoutes = [];
    this.gymRoutes = [];
  }

  addListeners(){
    let wallsRef = firebase.database().ref('walls');
    wallsRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key])
      }
      Notifications.notify("RouteModel.routesUpdated")
    });
  }

  watchAllRoutesInGym(gymId){
    this.routesRef = firebase.database().ref('routes').orderByChild("gym_id").equalTo(gymId);
    this.routesRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key]);
      }
      Notifications.notify("RouteModel.routesUpdated");
    });
  }

  watchAllRoutes(){
    this.routesRef = firebase.database().ref('routes').orderByChild("gym_id");
    this.routesRef.on('value', data => {
      this.routes = [];
      for(var key in data.val()){
        this.routes.push(data.val()[key]);
      }
      Notifications.notify("RouteModel.routesUpdated");
    });
  }


  updateRoute(route){
    var updates = {};
    updates['/routes/' + route.id] = route;
    return firebase.database().ref().update(updates);
  }

  getRoutesByWallId(id){
    this.routesRef = firebase.database().ref('routes').orderByChild("wall_id").equalTo(id);
    this.routesRef.on('value', data => {

      this.routes = [];
      for(var key in data.val()){
        this.routes.push(this.parseRoute(data.val()[key]))
      }
      Notifications.notify("RouteModel.routesUpdated")
    });
  }

  parseRoute(route){
    route.last_set = new Date(route.last_set);
    route.created_at = new Date(route.created_at);
    route.updated_at = new Date(route.updated_at);
    return route;
  }

  createRoute(gymId, wallId, color="gray", grade="0", risk=0, intensity=0, complexity=0, exposure=0){
    let newRouteKey = firebase.database().ref().child('routes').push().key;
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
    updates['/routes/' + newRouteKey] = route;
    return firebase.database().ref().update(updates);
  }

  deleteRoute(id){
    let routesRef = firebase.database().ref('routes/' + id);
    return routesRef.remove().then(() => {
      Notifications.notify("RouteModel.routesUpdated")
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  findColorIndex(color){
    var value;
    switch(color){
      case "rgba(209,209,209, 0.8)":
        value = 0;
        break;
      case "rgba(255,210,28, 0.8)":
        value = 1;
        break;
      case "rgba(5,179,99, 0.9)":
        value = 2;
        break;
      case "rgba(243,23,38, 0.8)":
        value = 3;
        break;
      case "rgba(48,99,245, 0.8)":
        value = 4;
        break;
      case "rgba(252,109,33, 0.8)":
        value = 5;
        break;
      case "rgba(183,22,229,0.8)":
        value = 6;
        break;
      case "rgba(33,33,33,0.9)":
        value = 7;
        break;
    }
    return value;
  }
}

export default new RouteModel();
