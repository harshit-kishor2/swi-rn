// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import notifee from '@notifee/react-native';
// import {IMAGES} from '../Resources';

// const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// };

// async function registerAppWithFCM() {
//   await messaging().registerDeviceForRemoteMessages();
// }

// async function getFCMToken() {
//   try {
//     let fcmToken = await AsyncStorage.getItem('fcm-token');
//     if (fcmToken !== undefined && fcmToken !== null && fcmToken !== '') {
//       return fcmToken;
//     } else {
//       fcmToken = await messaging().getToken();
//       console.log('fcm-token', fcmToken);
//       AsyncStorage.setItem('fcm-token', fcmToken);
//       return fcmToken;
//     }
//   } catch (error) {
//     console.log('FCM token get error:', error.message);
//     throw error;
//   }
// }

// const onDisplayNotification = async (title, body, data) => {
//   // Create a channel
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//   });

//   // Display a notification
//   await notifee.displayNotification({
//     title: title,
//     body: body,
//     data: data,
//     android: {
//       channelId,
//       smallIcon: IMAGES.defaultThumnail,
//       pressAction: {
//         id: 'default',
//       },
//       // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//     },
//   });
// };

// export {
//   requestUserPermission,
//   registerAppWithFCM,
//   getFCMToken,
//   onDisplayNotification,
// };
