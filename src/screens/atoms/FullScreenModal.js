import {CustomIcon} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';

const FullScreenModal = ({selectedFile, onClose}) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const [isVideoPause, setIsVideoPause] = useState(false);

  const videoRef = useRef();

  const onScreenClose = () => {
    onClose();
    setIsVideoPause(false);
    setVideoLoading(true);
  };
  return (
    <Modal
      style={{
        flex: 1,
        backgroundColor: '#000000',
        paddingBottom: 20,
      }}
      visible={selectedFile.visible}
      presentationStyle="fullScreen"
      onRequestClose={onScreenClose}
      supportedOrientations={['portrait']}
      hardwareAccelerated>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 20,
            flexDirection: 'row-reverse',
          }}>
          <Pressable onPress={onScreenClose}>
            <CustomIcon
              name={'close'}
              origin={ICON_TYPE.MATERIAL_ICONS}
              size={25}
              color={'#fff'}
            />
          </Pressable>
        </View>
        {selectedFile.type === 'image' ? (
          <Image
            resizeMode="contain"
            onLoad={() => {
              setVideoLoading(false);
            }}
            source={{uri: selectedFile.uri}}
            style={{
              flex: 1,
            }}
          />
        ) : null}
        {selectedFile.type === 'pdf' ? (
          <Pdf
            trustAllCerts={false}
            source={{uri: selectedFile.uri}}
            style={{flex: 1}}
            // onLoadProgress={() => {
            //   setVideoLoading(true);
            // }}
            onLoadComplete={(numberOfPages, filePath) => {
              setVideoLoading(false);
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
          />
        ) : null}
        {selectedFile.type === 'video' ? (
          <Pressable
            style={{flex: 1}}
            onPress={() => {
              setIsVideoPause(!isVideoPause);
            }}>
            <Video
              ref={videoRef}
              source={{uri: selectedFile.uri}} // Replace with your video URL
              style={{flex: 1}}
              controls
              paused={isVideoPause}
              resizeMode="contain"
              onLoad={() => {
                setVideoLoading(false);
              }}
            />

            {isVideoPause && (
              <Pressable
                onPress={() => {
                  setIsVideoPause(!isVideoPause);
                }}
                style={{
                  height: 50,
                  width: 50,
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  top: '40%',
                }}>
                <CustomIcon
                  name={'pause'}
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  size={40}
                />
              </Pressable>
            )}
          </Pressable>
        ) : null}
        {videoLoading && (
          <View
            style={{
              height: 40,
              width: 40,
              position: 'absolute',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size={30} color={'#fff'} />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default FullScreenModal;

const styles = StyleSheet.create({});
