import { toast } from "react-toastify";
import { app } from "../firebaseConfig";
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging";

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

const PUBLIC_API_KEY = "BIYJ5pGOrzKGluWvQ07uEvLAgVxOONpd-HOg5L_GjXqh5VnT_OEcUwp1iPvfuuAkzCuccndzI0hbpFWMPZX9Zic";

export const requestNotificationPermission = () => {
  try {
    console.log("Requesting permission...");
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("[Notifications] permission granted.");          
          return true;
        }
        toast('Please enable notifications.', {
          type: 'error', 
        });
        return false;
      })
      .catch(() => {        
        return false;
      });
  } catch (ex) {
    console.error(`requestNotificationPermission: ${ex}`);
    return false;
  }
};

export const requestForToken = () => {
  requestNotificationPermission();
  return getToken(messaging, { vapidKey: PUBLIC_API_KEY })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          // Configurar o serviço de ouvinte de mensagens Firebase Cloud Messaging
          console.log('Notifications : currentToken => ', currentToken);
        } else {
          // Show permission request UI
          console.log(
            "Notifications : No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving token. ", err);
        // ...
      });
}

export const initializeFirebaseMessaging = async () => {
  console.log('[Notifications]: initializeFirebaseMessaging() : Initi');
  const hasNotificationPermission = requestNotificationPermission();
  if (hasNotificationPermission) {
    
  }
};

export const onMessageListener = () : Promise<MessagePayload> =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('[Notifications]: payload', payload, ' messaging: ', messaging);
      resolve(payload);
    });
});


