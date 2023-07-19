import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, IMAGES} from '@app/resources';

import {fire} from 'react-native-alertbox';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';
import {AndroidCameraPermission} from '../../../../androidcamerapermission';
import {Custombutton} from '@app/components';
import {addProductDetail} from '@app/store/addProduct.slice';
import {styles} from './style';

const VideoimageScreen = ({NextPress}) => {
  const [selectedImage, setSelectedImage] = useState();
  const [imagePath, setImagePath] = useState([]);
  const [error, setError] = useState('no');
  const [thumb_Image, setthumb_Image] = useState();
  const [paused, setPaused] = useState(false);
  const dispatch = useDispatch();
  console.log('imagePath', imagePath);

  const uploadImage = async () => {
    const permissionStatus = await AndroidCameraPermission();
    console.log('Permission', permissionStatus);
    if (permissionStatus) {
      fire({
        title: 'Choose Mode',

        actions: [
          {
            text: 'Camera',
            onPress: cameramode,
          },

          {
            text: 'Gallery',
            onPress: gallarymode,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      });
    }
  };

  const cameramode = () => {
    fire({
      title: 'Message',
      message: 'seclect mode',
      actions: [
        {
          text: 'photo',
          onPress: camera,
        },
        {
          text: 'video',
          onPress: videoFromcamera,
        },

        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    });
  };
  const gallarymode = () => {
    fire({
      title: 'Message',
      message: 'seclect mode',
      actions: [
        {
          text: 'photo',
          onPress: gallary,
        },
        {
          text: 'video',
          onPress: videofromgallary,
        },

        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    });
  };

  const camera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (image?.size <= 5242880) {
        setImagePath(img => [...img, image]);
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  const videoFromcamera = () => {
    ImageCropPicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      if (image?.size <= 10485760) {
        setImagePath(img => [...img, image]);
      } else {
        Alert.alert('video length exceed 10MB');
      }
    });
  };
  console.log(imagePath);
  const gallary = () => {
    setError('no');
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log('asdfghjk', image);
      // let newImg = {
      //   name: 'profile_pic',
      //   filename: 'profile1.jpg',
      //   path: image?.path,
      //   filepath:
      //     Platform.OS === 'android'
      //       ? image?.path?.replace('file://', '')
      //       : image?.path,
      //   filetype: 'image/jpeg',
      // };
      if (image?.size <= 5242880) {
        setImagePath(img => [...img, image]);
      } else {
        Alert.alert('Image size exceed 5MB');
      }
    });
  };
  const videofromgallary = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log('Size===', video);
      if (video?.size <= 10485760) {
        setImagePath(img => [...img, video]);
      } else {
        Alert.alert('video length exceed 10MB');
      }
    });
  };
  const handleImagePress = image => {
    setSelectedImage(image);
    if (selectedImage?.mime === 'video/mp4') {
      setPaused(true);
    } else {
      setPaused(false);
    }
  };

  // for (const object of imagePath) {
  //   if (object?.mime === 'image/jpeg') {
  //     setthumb_Image(object);
  //     break;
  //   }
  // }
  // console.log('first Image --->>>>>', firstImageMode);

  const Submit = () => {
    if (!imagePath.length) {
      setError('yes');
      return;
    }
    const formData = new FormData();
    imagePath.forEach((image, index) => {
      // console.log('==video==', image);
      const d = image?.path?.split('/');
      const name = d[d.length - 1];
      // console.log('Name', name);
      formData.append(`product_file[${index}]`, {
        name: name ?? 'Image' + index + '.jpg',
        type: image.mime,
        uri:
          Platform.OS === 'ios'
            ? image.path.replace('file://', '')
            : image.path,
      });
    });

    let mainthumb;
    for (const object of imagePath) {
      console.log('OBJ===', object);
      if (object?.mime === 'image/jpeg') {
        const a = object?.path?.split('/');
        mainthumb = a[a.length - 1];
        formData.append('thumb_image', {
          name: mainthumb,
          type: object.mime,
          uri:
            Platform.OS === 'ios'
              ? object?.path.replace('file://', '')
              : object?.path,
        });
        break;
      } else {
        setError('yes');
      }
    }
    if (!mainthumb) {
      setError('thumb');
      return;
    } else {
      formData.append('title', 'draft project');
      formData.append('user_id', '3');
      dispatch(addProductDetail(formData));
      NextPress();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{}}>
        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 16,
              color: COLORS.BLACK,
            }}>
            Upload watch images<Text style={{color: 'red'}}>*</Text>
          </Text>
          <Text style={{fontFamily: 'OpenSans-Regular', margin: 10}}>
            Please upload Image of max 10mb
          </Text>
        </View>
        {selectedImage ? (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={selectedImage?.mime !== 'video/mp4'}
            onPress={() => setPaused(!paused)}
            style={styles.bigImageContainer}>
            {selectedImage?.mime === 'video/mp4' ? (
              <Video
                controls={false}
                source={{uri: selectedImage?.path}}
                style={styles.backgroundVideo}
                paused={paused}
                resizeMode="contain"
                repeat={true}
              />
            ) : (
              <Image
                source={{uri: selectedImage?.path}}
                style={styles.bigImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={selectedImage?.mime !== 'video/mp4'}
            onPress={() => setPaused(!paused)}
            style={styles.bigImageContainer}>
            {selectedImage?.mime === 'video/mp4' ? (
              <Video
                controls={false}
                source={{uri: selectedImage?.path}}
                style={styles.backgroundVideo}
                paused={paused}
                resizeMode="contain"
                repeat={true}
              />
            ) : (
              <View>
                <Image
                  source={{uri: selectedImage?.path}}
                  style={styles.bigImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={uploadImage}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.addbtn}>
                    <Image source={IMAGES.imageAdd} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
        <View style={{marginTop: 5, marginLeft: 15}}>
          <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 16}}>
            Selected images/videos
          </Text>
          {error === 'yes' ? (
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 16,
                color: 'red',
              }}>
              Please Select Files
            </Text>
          ) : null}
          {error === 'thumb' ? (
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 16,
                color: 'red',
              }}>
              Please Select Thumbnail File
            </Text>
          ) : null}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.smallImagesContainer}>
          {imagePath
            ? imagePath?.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImagePress(image)}>
                  <View
                    style={[
                      // styles.smallImageWrapper,
                      selectedImage === image && styles.selectedImageWrapper,
                    ]}>
                    <Image
                      source={{uri: image.path}}
                      style={styles.smallImage}
                    />
                  </View>
                </TouchableOpacity>
              ))
            : null}
          <TouchableOpacity onPress={uploadImage}>
            <View style={styles.addbtn}>
              <Image source={IMAGES.imageAdd} />
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Custombutton
          title="NEXT"
          marginTop={20}
          height={50}
          width={335}
          marginHorizontal={20}
          onPress={() => {
            Submit();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default VideoimageScreen;
