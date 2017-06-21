/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/21/2017.
 * (C) BIT TECHNOLOGIES
 */

/*
    NOTIFICATION SERVICE is based on https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
 */

class NotificationServiceClass {

  contentState = null; //from redux store
  dispatch = null;
  bStarted = false;

  constructor(props){

    console.log("@@@@ Notification Service - CREATE instance");

  }

  askForPermissions(){
    if (typeof window === null) return ; //it must be in the browser

    if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
      return;
    }

    Notification.requestPermission().then(function(result) {
      console.log("NOTIFICATION PERMISSION",result);
    });

  }


  spawnNotification(){

      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        console.log("This browser does not support system notifications");
        return;
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Hi there!");
          }
        });
      }

      // Finally, if the user has denied notifications and you
      // want to be respectful there is no need to bother them any more.
  }

}

var NotificationServiceInstance = new NotificationServiceClass();

export default NotificationServiceInstance;
