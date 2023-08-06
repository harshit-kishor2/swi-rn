import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {showAlert} from '@app/helper/commonFunction';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Card} from 'react-native-paper';

const ImageModal = ({modalVisible, setModalVisible}) => {
  const launchGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image?.size <= 5242880) {
          console.log('GalleryImage', image);
          setModalVisible(!modalVisible);
        } else {
          showAlert({
            title: 'Alert!',
            message: 'Image size exceed 5MB',
          });
        }
      })
      .catch(err => {
        console.log('Error==', err);
      });
  };

  const launchCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image?.size <= 5242880) {
          console.log('Camera Image', image);
          setModalVisible(!modalVisible);
        } else {
          showAlert({
            title: 'Alert!',
            message: 'Image size exceed 5MB',
          });
        }
      })
      .catch(err => {
        console.log('Error==', err);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <Card style={styles.card_container}>
          <View style={styles.border} />
          <CustomText style={styles.upload_text}>Upload Image</CustomText>
          <View style={styles.button_container}>
            <Pressable onPress={launchCamera} style={styles.icon_container}>
              <CustomIcon
                name={'camera-plus'}
                origin={ICON_TYPE.MATERIAL_COMMUNITY}
                size={70}
                color={'#ffffff'}
              />
            </Pressable>
            <Pressable onPress={launchGallery} style={styles.icon_container}>
              <CustomIcon
                name={'picture'}
                origin={ICON_TYPE.FONTISTO}
                size={50}
                color={'#ffffff'}
              />
            </Pressable>
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  backdrop: {
    height: '70%',
  },
  border: {
    width: 60,
    height: 3,
    backgroundColor: '#B1B1B1',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  upload_text: {
    color: '#00958C',
    fontFamily: FontsConst.OpenSans_SemiBold,
    alignSelf: 'center',
    fontSize: 16,
  },
  card_container: {
    height: '30%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 20,
    alignItems: 'center',
  },
  icon_container: {
    height: 100,
    width: 100,
    borderRadius: 15,
    backgroundColor: '#00958C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
