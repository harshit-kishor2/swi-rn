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

const VideoimageScreen = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [imagePath, setImagePath] = useState([]);

  const uploadImage = async () => {
    const permissionStatus = await AndroidCameraPermission();
    if (permissionStatus) {
      // Alert.alert('profile picture', 'choose option', [
      //   {text: 'Camera', onPress: camera},
      //   {text: 'gallery', onPress: gallary},
      //   // {text: 'cancel', onPress: () => {}},
      //   {text: 'videofromgallary', onPress: videofromgallary},
      // ]);
      fire({
        title: 'Choose Mode',
        // message: 'seclect mode',
        actions: [
          {
            text: 'camera',
            onPress: cameramode,
          },
          // {
          //   text: 'video',
          //   onPress: videofromgallary,
          // },
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
      setImagePath(img => [...img, image]);
    });
  };
  const videoFromcamera = () => {
    ImageCropPicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      console.log(image);
      setImagePath(img => [...img, image]);
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
      setImagePath(img => [...img, image]);
    });
  };
  const videofromgallary = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log('video', video);
      setImagePath(img => [...img, video]);
    });
  };
  const handleImagePress = image => {
    setSelectedImage(image);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.subheading}>
          You are few step away to post your watch
        </Text>
        <Text style={styles.prograssiveNo}>1/3</Text>
      </View>
      <View style={styles.prograssiveMain}>
        <View style={[styles.prograssive]}></View>
        <View style={[styles.prograssive, {opacity: 0.25}]}></View>
        <View style={[styles.prograssive, {opacity: 0.25}]}></View>
      </View>
      <ScrollView style={{}}>
        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'OpenSans-SemiBold', fontSize: 16}}>
            Upload watch images*
          </Text>
          <Text>Please upload Image of max 10mb</Text>
        </View>
        <View style={styles.bigImageContainer}>
          <Image source={{uri: selectedImage?.path}} style={styles.bigImage} />
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
            Alert.alert('hello');
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
