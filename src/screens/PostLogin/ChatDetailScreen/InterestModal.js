import {FontsConst} from '@app/assets/assets';
import {
  CustomIcon,
  CustomText,
  Search,
  Spacer,
  SubmitButton,
} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import SearchBarComponent from '@app/components/SearchBarComponent';
import {showAlert} from '@app/helper/commonFunction';
import {useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Card, TextInput} from 'react-native-paper';
import {EmptyList} from '../ChatScreen/commn';
const IMAGE = {
  uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbkLlIwF2xKG4QZq9aFTMRH7Orn1L39UADtLp70Eg=s64-c-mo',
};
const InterestModal = ({modalVisible, setModalVisible}) => {
  const [search, setSearch] = useState('');

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.listContainer}>
        <Pressable style={styles.checkBoxContainer} onPress={() => {}}>
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={true ? 'check-box' : 'check-box-outline-blank'}
            color={true ? '#00958C' : '#868686'}
            size={20}
          />
        </Pressable>
        <View style={styles.product}>
          <Image style={styles.avatar} source={IMAGE} />
          <View
            style={{
              paddingLeft: 15,
            }}>
            <CustomText style={styles.brandtext}>
              2020 Fossil Analog Watch
            </CustomText>
            <View style={styles.price_row}>
              <CustomText style={styles.price}>$12500</CustomText>
              <View style={styles.circle} />
              <CustomText style={styles.condition}>Brand New</CustomText>
            </View>
          </View>
        </View>
      </View>
    );
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
        <View style={styles.card_container}>
          <View style={styles.border} />
          <CustomText style={styles.interest_text}>
            Select watch to which user mark their interest
          </CustomText>
          <View style={styles.input}>
            <TextInput
              mode="outlined"
              value={search}
              onChangeText={v => setSearch(v)}
              activeOutlineColor=""
              outlineStyle={{
                borderRadius: 10,
              }}
              left={
                <TextInput.Icon
                  forceTextInputFocus={false}
                  icon={() => (
                    <CustomIcon
                      name={'search'}
                      origin={ICON_TYPE.MATERIAL_ICONS}
                      size={25}
                    />
                  )}
                />
              }
              right={
                search.length ? (
                  <TextInput.Icon
                    forceTextInputFocus={false}
                    onPress={() => setSearch('')}
                    icon={() => (
                      <CustomIcon
                        name={'clear'}
                        origin={ICON_TYPE.MATERIAL_ICONS}
                        size={25}
                      />
                    )}
                  />
                ) : null
              }
            />
          </View>
          <FlatList
            contentContainerStyle={styles.flatListContainer}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={renderItem}
            ListEmptyComponent={EmptyList}
          />
          <SubmitButton lable="Add to interest list" onPress={() => {}} />
        </View>
      </View>
    </Modal>
  );
};

export default InterestModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#00000040',
  },
  backdrop: {
    height: '10%',
  },
  border: {
    width: 60,
    height: 3,
    backgroundColor: '#B1B1B1',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  interest_text: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  card_container: {
    height: '90%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    flex: 1,
    flexDirection: 'column',
  },
  product: {
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  brandtext: {
    color: '#000000',
    fontFamily: FontsConst.Cabin_Bold,
  },
  price_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Bold,
    fontSize: 15,
  },
  condition: {
    color: '#00958C',
    fontFamily: FontsConst.Cabin_Regular,
    fontSize: 12,
  },
  circle: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#00958C',
    marginHorizontal: 2,
  },
  listContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  flatListContainer: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  checkBoxContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});
