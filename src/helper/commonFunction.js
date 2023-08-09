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
  const mergedArray = baseArray.map(baseItem => {
    const matchingItem = newArray.find(newItem => {
      return newItem.id === baseItem.id;
    });
    return matchingItem ? {...baseItem, ...matchingItem} : baseItem;
  });
  const newItems = newArray.filter(
    newItem => !baseArray.some(baseItem => baseItem.id === newItem.id),
  );

  return [...mergedArray, ...newItems];
};

export function addObjectAndUpdate(array, newObject) {
  const index = array.findIndex(obj => obj.id === newObject.id);

  if (index !== -1) {
    // Update the existing object
    array[index] = newObject;
  } else {
    // Add the new object at the start of the array
    array.unshift(newObject);
  }

  return array;
}
