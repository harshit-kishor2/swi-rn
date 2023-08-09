import moment from 'moment';
import {fire} from 'react-native-alertbox';

export function addEllipsis(text, maxLength) {
  if (text && text?.length > maxLength) {
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

export const capitalizeFirstLetter = str => {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Return the original value if it's not a string or an empty string
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const mergeArrays = (baseArray, newArray) => {
  console.log('newItem.baseArray === newArray', {
    baseArray,
    newArray,
  });
  const mergedArray = baseArray.map(baseItem => {
    const matchingItem = newArray.find(newItem => {
      console.log('newItem.id === baseItem.id', {
        a: newItem.id,
        b: baseItem.id,
      });
      return newItem.id === baseItem.id;
    });
    return matchingItem ? {...baseItem, ...matchingItem} : baseItem;
  });
  console.log('MergedArray', mergedArray);
  const newItems = newArray.filter(
    newItem => !baseArray.some(baseItem => baseItem.id === newItem.id),
  );
  console.log('newItems', newItems);

  return [...mergedArray, ...newItems];
};
