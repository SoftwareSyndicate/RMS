import Notifications from 'services/NotificationService'

class NotificationModel {
  constructor(){
    this.notificatons = [];
  }

  updateRoutes(){
    var updates = {};

    this.routes.forEach(route => {
      console.log(route);
      /* updates['/routes/' + route.id] = route; */
    });
  }

  createNotification(authorId, gymId="-KLi8WWAMzuH1k4mlkbj", type="text", text="", link="", wallId=""){
    let newNotificationKey = firebase.database().ref().child('notifications').push().key;
    let now = new Date().getTime();
    let notification = {
      id: newNotificationKey,
      author_id: authorId,
      gym_id:  gymId, //TODO kill default value passed ^
      created_at: now,
      updated_at: now,
      type: type,
      text: text,
      link: link,
      wall_id: wallId,
    };

    var updates = {};
    updates['/notifications/' + newNotificationKey] = notification;
    return firebase.database().ref().update(updates);
  }

  updateNotification(notification){
    var updates = {};
    updates['/notifications/' + notification.id] = notification;
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

export default new NotificationModel();
