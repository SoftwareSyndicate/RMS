import Notifications from '../services/NotificationService'

class RouteModel {
  constructor(){
    this.routes = [];
    this.sentRoutes = [];
    this.gymRoutes = [];
    this._routesByWall = {};
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
      this._routes = data;
      let _data = data.val();
      for(var key in _data){
        let rt = _data[key];
        this.routes.push(rt);

        // set routes by wall
        if(!this._routesByWall.hasOwnProperty(rt.wall_id)){
          this._routesByWall[rt.wall_id] = [];
        }
        this._routesByWall[rt.wall_id].push(rt);
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
}

export default new RouteModel();
