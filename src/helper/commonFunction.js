import moment from 'moment';
import {fire} from 'react-native-alertbox';

export function addEllipsis(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

export function formatTimestamp(timestamp) {
  const currentTime = moment.utc();
  const postTime = moment.utc(timestamp);
  const daysAgo = currentTime.diff(postTime, 'days');

  const formattedTime = daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
  return `Posted ${formattedTime}`;
}

export const showAlert = ({title = '', message = '', actions}) =>
  fire({
    title: `${title}`,
    message: `${message}`,
    actions: actions
      ? actions
      : [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
  });

//   actions: [
//     {
//       text: 'Close',
//       style: 'cancel',
//     },
//     {
//       text: 'Approve',
//       onPress: (data) => console.log(data), // It is an object that holds fields data
//     },
//   ],
// // fields
// fields: [
//   {
//     name: 'username',
//     placeholder: 'Enter username',
//   },
// ],
