import {AssestsConst} from '@app/assets/assets';
import {CustomIcon} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';

import React from 'react';
import {Pressable} from 'react-native';
import {Alert, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-paper';

const ImageContainer = ({handleChange, value}) => {
  const OpenPicker = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      showAlert({
        title: 'Choose Mode',
        actions: [
          {
            text: 'Camera',
            onPress: choosePicFromCamera,
          },
          {
            text: 'Gallery',
            onPress: choosePicFromGallery,
          },
          {
            text: 'Cancel',
            style: 'Cancel',
          },
        ],
      });
    }
  };

  const choosePicFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image?.size <= 5242880) {
        handleChange('image', image);
        handleChange('path', image?.path);
      } else {
        Alert.alert('Image size exceed 5 MB');
      }
    });
  };

  const choosePicFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image?.size <= 5242880) {
        handleChange('image', image);
        handleChange('path', image?.path);
      } else {
        Alert.alert('image size exceed 5MB');
      }
    });
  };

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable onPress={OpenPicker}>
        {value ? (
          <Avatar.Image
            style={{
              opacity: 0.8,
            }}
            size={120}
            source={{
              uri: value,
            }}
          />
        ) : (
          <Avatar.Image
            style={{
              opacity: 0.4,
            }}
            size={120}
            source={AssestsConst.AVATAR}
          />
        )}
      </Pressable>

      <Pressable
        onPress={OpenPicker}
        style={{
          position: 'absolute',
        }}>
        <CustomIcon
          name={'pencil'}
          origin={ICON_TYPE.OCTICONS}
          size={40}
          color={'#00958C'}
        />
      </Pressable>
    </View>
  );
};
export default ImageContainer;
