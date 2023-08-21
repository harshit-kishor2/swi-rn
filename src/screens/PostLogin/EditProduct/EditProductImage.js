import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Spacer, SubmitButton} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {LoadingStatus} from '@app/helper/strings';
import {COLORS} from '@app/resources';
import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';

const EditProductImage = ({onNextClick, ...props}) => {
  const {productReducer, editProductImage} = props;
  const [pickImage, setPickImage] = useState([]);
  const [selected, setSelected] = useState(null);
  const [pause, setPause] = useState(false);
  const [Imagepath, setImagePath] = useState([]);

  useEffect(() => {
    if (
      productReducer?.getAllDataActionLoadingStatus === LoadingStatus.LOADED
    ) {
      const temp = productReducer?.getAllDataAction?.files.map(item => {
        return {
          path: item?.file,
          mime: item?.type == 'video' ? 'video/mp4' : 'image/jpeg',
        };
      });
      setImagePath(temp);
    }
  }, [productReducer?.getAllDataActionLoadingStatus]);

  const openPicker = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      if (Imagepath.length < 5) {
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
          message: 'You can not add more than 5 images or videos',
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
        setPickImage(data => {
          return [...data, image];
        });
        setImagePath(data => {
          return [
            ...data,
            {
              mime: image?.mime,
              path: image?.path,
            },
          ];
        });
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  const chooseVideoFromCamera = () => {
    ImageCropPicker.openCamera({
      mediaType: 'video',
    }).then(video => {
      if (video?.size <= 10485760) {
        setPickImage(data => {
          return [...data, video];
        });
        setImagePath(data => {
          return [
            ...data,
            {
              mime: video?.mime,
              path: video?.path,
            },
          ];
        });
      } else {
        Alert.alert('Video length exceed 10MB');
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
        setPickImage(data => {
          return [...data, image];
        });
        setImagePath(data => {
          return [
            ...data,
            {
              mime: image?.mime,
              path: image?.path,
            },
          ];
        });
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
        setPickImage(data => {
          return [...data, video];
        });
        setImagePath(data => {
          return [
            ...data,
            {
              mime: video?.mime,
              path: video?.path,
            },
          ];
        });
      } else {
        Alert.alert('Video length exceed 10MB');
      }
    });
  };
  const onImageSubmit = () => {
    if (pickImage.length <= 0) {
      onNextClick();
    } else {
      // Submit data
      const formData = new FormData();

      pickImage?.forEach((image, index) => {
        const d = image?.path?.split('/');
        const name = d[d.length - 1];
        //Set images in key
        formData.append(`product_file[${index}]`, {
          name: name ?? 'Image' + index + '.jpg',
          type: image?.mime,
          uri:
            Platform.OS === 'ios'
              ? image.path.replace('file://', '')
              : image.path,
        });
      });
      editProductImage({
        product_id: props?.route?.params?.product_id,
        Data: formData,
      }).then(res => {
        if (res?.type.includes('fulfilled')) {
          onNextClick();
        } else if (res?.type.includes('rejected')) {
          showAlert({
            title: 'Server error !',
          });
        }
      });
    }
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
        {Imagepath?.map((item, index) => {
          return (
            <Pressable
              key={index}
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
                  selected?.path == item?.path
                    ? '#00958C'
                    : item.mime == 'video/mp4'
                    ? '#00000080'
                    : '#F0F2FA',
              }}
              onPress={() => setSelected(item)}>
              {item.mime === 'video/mp4' ? (
                <CustomIcon
                  name={'video'}
                  origin={ICON_TYPE.OCTICONS}
                  size={50}
                  color={'black'}
                />
              ) : (
                <Image
                  source={{uri: item?.path}}
                  resizeMode="stretch"
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 8,
                  }}
                />
              )}
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
          productReducer?.updateProductImageActionLoadingStatus ===
          LoadingStatus.LOADING
        }
        loading={
          productReducer?.updateProductImageActionLoadingStatus ===
          LoadingStatus.LOADING
        }
      />
    </ScrollView>
  );
};

// export default EditProductImage;

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

export default EditProductImage;
