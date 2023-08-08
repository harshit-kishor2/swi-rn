import messaging from '@react-native-firebase/messaging';
import {getFCMToken} from './firebaseServices';
import {PermissionsAndroid} from 'react-native';

import notifee from '@notifee/react-native';

export async function onDisplayNotification(title, body) {
  // Request permissions (required for iOS)
  //await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export async function requestUserPermission() {
  let r = PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  console.log(r, 'dfghjklsdfghjkxcjkfghjkdfghj================....');
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('received in forground', remoteMessage);
    // const jsonData = JSON.parse(remoteMessage.data.default);
    // const again = JSON.parse(jsonData.GCM);

    // // Access the title and body properties
    // const title = again.data.title;
    // const body = again.data.body;
    // console.log(title, 'fghjkl');
    // console.log(body, 'fghjkl');

    onDisplayNotification('dfghjkl', 'fghjkl');
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
