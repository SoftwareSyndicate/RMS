import Notifications from 'rms-services/NotificationService'

class NotificationModel {
  constructor(){
    this.notificatons = [];
  }

  updateRoutes(){
    var updates = {};

    this.routes.forEach(route => {

      /* updates['/routes/' + route.id] = route; */
    });
  }

  createNotification(authorId, firstName, lastName, gymId="-KLi8WWAMzuH1k4mlkbj", type="text", text="", link="", video="", wallId=""){
    let newNotificationKey = firebase.database().ref().child('notifications').push().key;
    let now = new Date();
    let notification = {
      id: newNotificationKey,
      author_id: authorId,
      first_name: firstName,
      last_name: lastName,
      gym_id:  gymId,
      created_at: now,
      updated_at: now,
      type: type,
      text: text,
      link: link,
      video: video,
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

  deleteNotification(id){
    let notificationRef = firebase.database().ref('notifications/' + id);
    return routesRef.remove().then(() => {
      Notifications.notify("RouteModel.routesUpdated")
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  watchAllNotifications(gymId='-KLi8WWAMzuH1k4mlkbj'){
    this.notifRef = firebase.database().ref('notifications');//.orderByChild('gym_id').equalTo(gymId);
    this.notifRef.on('value', (data)=>{
      this.notifications = [];
      for(var key in data.val()){
        let notif = data.val()[key];
        this.notifications.push(notif);
      }
      Notifications.notify('NotificationModel.notificationsUpdated', data.exportVal());
    })
  }

  getNotifications(gymId = '-KLi8WWAMzuH1k4mlkbj'){
    this.notifRef = firebase.database().ref('notifications').orderByChild('gym_id').equalTo(gymId);
    notifRef.on('value', (data)=>{
      Notifications.notify('NotificationModel.notificationsUpdated', data.exportVal());
    })
  }
}

export default new NotificationModel();
