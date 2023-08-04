import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import notifee from '@notifee/react-native';
import {IMAGES} from '../resources';
import {SharedPreference} from '@app/helper';
// import {IMAGES} from '../Resources';

async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}

async function getFCMToken() {
  try {
    let fcmToken = await SharedPreference.getItem(
      SharedPreference.keys.DEVICE_TOKEN,
      '',
    );
    if (fcmToken !== undefined && fcmToken !== null && fcmToken !== '') {
      return fcmToken;
    } else {
      fcmToken = await messaging().getToken();
      SharedPreference.setItem(SharedPreference.keys.DEVICE_TOKEN, fcmToken);
      return fcmToken;
    }
  } catch (error) {
    console.log('FCM token get error:', error.message);
    throw error;
  }
}

const onDisplayNotification = async (title, body, data) => {
  // Create a channel
  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  // });
  // // Display a notification
  // await notifee.displayNotification({
  //   title: title,
  //   body: body,
  //   data: data,
  //   android: {
  //     channelId,
  //     smallIcon: IMAGES.Chaticon,
  //     pressAction: {
  //       id: 'default',
  //     },
  //     // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //   },
  // });
};

export {registerAppWithFCM, getFCMToken, onDisplayNotification};
