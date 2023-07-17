import * as React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Loader = ({size}) => (
  <ActivityIndicator
    animating={true}
    color={'#00958C'}
    size={size ?? 'large'}
  />
);

export default Loader;
