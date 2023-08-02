import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
  CustomIcon,
  CustomText,
  Spacer,
  SubmitButton,
} from '@app/components';
import {FontsConst} from '@app/assets/assets';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import {showAlert} from '@app/helper/commonFunction';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import Video from 'react-native-video';
import {LoadingStatus} from '@app/helper/strings';
import {COLORS} from '@app/resources';

const AddProductImage = ({onNextClick, ...props}) => {
  const {
    productReducer,
    updateProductImage,
    productState,
    updateProductDetails,
    onAddProductImage,
    authReducer,
  } = props;
  const [selected, setSelected] = useState(null);
  const [pause, setPause] = useState(false);

  const openPicker = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      console.log(productState?.productImage.length, 'length');
      if (productState?.productImage.length < 5) {
        showAlert({
          title: 'Choose Mode',
          actions: [
            {
              text: 'Camera',
              onPress: openCameraMode,
            },

            {
              text: 'Gallery',
              onPress: openGalleryMode,
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        });
      } else {
        showAlert({
          title: 'Warning',
          message: 'You can add more than 5 images or videos',
          actions: [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
        });
      }
    }
  };

  const openCameraMode = async () => {
    showAlert({
      title: 'Choose Mode',
      actions: [
        {
          text: 'Photo',
          onPress: choosePicFromCamera,
        },

        {
          text: 'Video',
          onPress: chooseVideoFromCamera,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    });
  };
  const openGalleryMode = async () => {
    showAlert({
      title: 'Choose Mode',
      actions: [
        {
          text: 'Photo',
          onPress: choosePicFromGallery,
        },

        {
          text: 'Video',
          onPress: chooseVideoFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    });
  };

  const choosePicFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image?.size <= 5242880) {
        updateProductImage(image);
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  const chooseVideoFromCamera = () => {
    ImageCropPicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      if (image?.size <= 10485760) {
        updateProductImage(image);
      } else {
        Alert.alert('video length exceed 10MB');
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
        updateProductImage(image);
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  const chooseVideoFromGallery = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
      height: 400,
      width: 300,
    }).then(video => {
      if (video?.size <= 10485760) {
        updateProductImage(image);
      } else {
        Alert.alert('video length exceed 10MB');
      }
    });
  };
  const onImageSubmit = () => {
    console.log('authReducer', authReducer);
    if (productState?.productImage.length <= 0) {
      showAlert({
        title: 'Please choose image/video.',
      });
    } else {
      // Submit data
      const formData = new FormData();
      let thumbImage = false;
      productState?.productImage?.forEach((image, index) => {
        const d = image?.path?.split('/');
        const name = d[d.length - 1];

        //Set images in key
        formData.append(`product_file[${index}]`, {
          name: name ?? 'Image' + index + '.jpg',
          type: image.mime,
          uri:
            Platform.OS === 'ios'
              ? image.path.replace('file://', '')
              : image.path,
        });

        //Set thumbnail in key
        if (image?.mime === 'image/jpeg' && !thumbImage) {
          thumbImage = true;
          formData.append('thumb_image', {
            name: name,
            type: image.mime,
            uri:
              Platform.OS === 'ios'
                ? image?.path.replace('file://', '')
                : image?.path,
          });
        }
      });
      if (thumbImage) {
        formData.append('title', 'draft project');
        formData.append('user_id', authReducer?.userProfileDetails?.id ?? '3');
        // onNextClick();
        if (!productState?.productDetails?.productID) {
          onAddProductImage(formData).then(res => {
            if (res?.type.includes('fulfilled')) {
              updateProductDetails({
                key: 'productID',
                value: res?.payload?.data?.id,
              });
              onNextClick();
            } else if (res?.type.includes('rejected')) {
              showAlert({
                title: 'Server error !',
              });
            }
          });
        } else {
          onNextClick();
        }
      } else {
        showAlert({
          title: 'Please add thumbnail image.',
        });
      }
    }
    // onNextClick();
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll_container}>
      <CustomText
        style={{
          fontFamily: FontsConst.OpenSans_Bold,
        }}>
        Upload watch images<CustomText style={{color: 'red'}}>*</CustomText>
      </CustomText>
      <Spacer />
      <CustomText
        style={{
          fontFamily: FontsConst.OpenSans_Regular,
          fontSize: 12,
        }}>
        Please upload Image of max 10mb
      </CustomText>
      <Spacer />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <View style={styles.selected_container}>
          {selected ? (
            selected.mime === 'video/mp4' ? (
              <Pressable style={{}} onPress={() => setPause(!pause)}>
                <Video
                  controls={false}
                  source={{uri: selected?.path}}
                  resizeMode="cover"
                  style={{
                    height: 250,
                    width: 250,
                    borderWidth: 2,
                    borderRadius: 16,
                    borderColor: COLORS.APPGREEN,
                  }}
                  paused={pause}
                  repeat={true}
                />
                {pause ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CustomIcon
                      origin={ICON_TYPE.ICONICONS}
                      name={'play-circle-outline'}
                      color={COLORS.BLACK}
                      size={40}
                    />
                  </View>
                ) : null}
              </Pressable>
            ) : (
              <Image
                source={{uri: selected?.path}}
                style={styles.selected_image}
              />
            )
          ) : (
            <Pressable onPress={openPicker} style={styles.add_container}>
              <CustomIcon
                name={'add'}
                origin={ICON_TYPE.MATERIAL_ICONS}
                size={30}
                color={'#00958C'}
              />
            </Pressable>
          )}
        </View>
      </View>
      <CustomText
        style={{
          paddingVertical: 10,
          fontFamily: FontsConst.OpenSans_Bold,
        }}>
        Selected images/videos
      </CustomText>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}>
        {productState?.productImage.map((item, index) => {
          return (
            <Pressable
              style={{
                height: 75,
                width: 75,
                margin: 5,
                borderRadius: 10,
                padding: 5,
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor:
                  selected?.path === item?.path ? '#00958C' : '#F0F2FA',
              }}
              onPress={() => setSelected(item)}>
              <Image
                source={{uri: item?.path}}
                resizeMode="stretch"
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 8,
                }}
              />
            </Pressable>
          );
        })}
        <Pressable onPress={openPicker} style={styles.add_container}>
          <CustomIcon
            name={'add'}
            origin={ICON_TYPE.MATERIAL_ICONS}
            size={30}
            color={'#00958C'}
          />
        </Pressable>
      </ScrollView>
      <Spacer height={30} />
      <SubmitButton
        onPress={onImageSubmit}
        lable="Next"
        disabled={
          productReducer?.addProductImageLoadingStatus === LoadingStatus.LOADING
        }
        loading={
          productReducer?.addProductImageLoadingStatus === LoadingStatus.LOADING
        }
      />
    </ScrollView>
  );
};

export default AddProductImage;

const styles = StyleSheet.create({
  scroll_container: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F0F2FA',
  },
  selected_container: {
    height: 250,
    width: 250,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected_image: {
    height: 250,
    width: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00958C',
  },
  add_container: {
    height: 80,
    width: 80,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#B5B6BB',
  },
});
