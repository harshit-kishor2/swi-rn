import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, IMAGES, SPACING} from '../../resources';

import Custombutton from '../../components/Button1';
import {styles} from './style';
import ImageCropPicker from 'react-native-image-crop-picker';
import {AndroidCameraPermission} from '../../../androidcamerapermission';
import {fire} from 'react-native-alertbox';
import Video from 'react-native-video';

const VideoimageScreen = ({NextPress}) => {
  const [selectedImage, setSelectedImage] = useState();
  const [imagePath, setImagePath] = useState([]);
  console.log('selectedImage', selectedImage);

  const uploadImage = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      fire({
        title: 'Choose Mode',

        actions: [
          {
            text: 'camera',
            onPress: cameramode,
          },

          {
            text: 'gallary',
            onPress: gallarymode,
          },
          {
            text: 'ok',
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
          text: 'ok',
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
          text: 'ok',
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
      console.log('------4-----', image);
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
      console.log(image);
      if (image?.size <= 5242880) {
        setImagePath(img => [...img, image]);
      } else {
        Alert.alert('video length exceed 5MB');
      }
    });
  };
  console.log(imagePath);
  const gallary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('----------->>>>>>>>>>', image);
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
      console.log('video', video);
      if (video?.size <= 5242880) {
        setImagePath(img => [...img, video]);
      } else {
        Alert.alert('video length exceed 5MB');
      }
    });
  };
  const handleImagePress = image => {
    setSelectedImage(image);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{}}>
        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 16}}>
            Upload watch images*
          </Text>
          <Text>Please upload Image of max 10mb</Text>
        </View>
        <View style={styles.bigImageContainer}>
          {selectedImage?.mime === 'video/mp4' ? (
            <Video
              controls={true}
              source={{uri: selectedImage?.path}}
              style={styles.backgroundVideo}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{uri: selectedImage?.path}}
              style={styles.bigImage}
            />
          )}
          {/* <Video
            controls={true}
            source={{uri: selectedImage?.path}}
            style={styles.backgroundVideo}
            resizeMode="contain"
          />
          <Image source={{uri: selectedImage?.path}} style={styles.bigImage} /> */}
        </View>
        <View style={{marginTop: 5, marginLeft: 15}}>
          <Text style={{fontFamily: 'OpenSans-Regular', fontSize: 16}}>
            Selected images/videos
          </Text>
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
          marginTop={40}
          height={50}
          width={335}
          marginHorizontal={20}
          onPress={() => {
            NextPress();
          }}
        />
      </ScrollView>
    </View>
  );
};

// const DATA = [
//   IMAGES.Rectangle91,

//   IMAGES.Rectangle2,

//   IMAGES.Rectangle31,

//   IMAGES.Rectangle32,

//   IMAGES.Rectangle33,

//   IMAGES.Rectangle91,
// ];

export default VideoimageScreen;
