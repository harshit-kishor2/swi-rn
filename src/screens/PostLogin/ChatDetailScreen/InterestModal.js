import {FontsConst} from '@app/assets/assets';
import {CustomIcon, CustomText, SubmitButton} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {LoadingStatus} from '@app/helper/strings';
import useDebounce from '@app/hooks/useDebounce';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {EmptyList} from '../ChatScreen/commn';

const InterestModal = props => {
  const {
    setAddModalVisible,
    modalVisible,
    setModalVisible,
    authReducer,
    exploreProduct,
    route,
    getIntersetList,
    chatReducer,
    onAddIntersetList,
  } = props;
  const {chat_item} = route.params;
  console.log(
    'IDSSSS',
    chat_item,
    chatReducer.getIntersetList,
    authReducer.userProfileDetails,
    exploreProduct.productDetails,
    authReducer.userProfileDetails.id,
  );
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const query = useDebounce(search);

  const sellerID = exploreProduct?.productDetails?.user?.id;
  const userID =
    authReducer.userProfileDetails.id ===
    exploreProduct?.productDetails?.user?.id
      ? chat_item.user_id
      : authReducer.userProfileDetails.id;

  const isSeller =
    exploreProduct?.productDetails?.user?.id ===
    authReducer.userProfileDetails.id;

  useEffect(() => {
    getIntersetList({
      seller_id: sellerID,
      user_id: userID,
      keyword: search,
    });
  }, [query]);

  useEffect(() => {
    if (
      chatReducer.getIntersetListLoadingStatus === LoadingStatus.LOADED ||
      chatReducer.addInIntersetListLoadingStatus === LoadingStatus.LOADED
    ) {
      setData(chatReducer.getIntersetList?.data);
    }
  }, [chatReducer]);

  const addIntersetList = () => {
    // seller_id=36&user_id=5&all_selected=_2,149_1,152_4&selected[0]=152_4&selected[1]=155_&keyword=test
    const params = {
      seller_id: sellerID,
      user_id: userID,
      all_selected: chatReducer.getIntersetList?.all_selected,
      keyword: search,
    };

    const selectedItems = {};

    data.forEach((item, index) => {
      if (item.checked === true) {
        selectedItems[`selected[${index}]`] = item.p_interest;
      }
    });
    const dataToSent = {...params, ...selectedItems};
    onAddIntersetList(dataToSent);
    setModalVisible(false);
  };

  const onUpdateRow = item => {
    const updatedArray = data.map(a => {
      if (a.id === item.id) {
        return {...a, checked: !item.checked};
      }
      return a;
    });
    setData(updatedArray);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          style={styles.checkBoxContainer}
          onPress={() => onUpdateRow(item)}>
          <CustomIcon
            origin={ICON_TYPE.MATERIAL_ICONS}
            name={item?.checked ? 'check-box' : 'check-box-outline-blank'}
            color={item?.checked ? '#00958C' : '#868686'}
            size={20}
          />
        </Pressable>
        <View style={styles.product}>
          <Image style={styles.avatar} source={{uri: item?.thumb_image}} />
          <View
            style={{
              paddingLeft: 15,
            }}>
            <CustomText style={styles.brandtext}>{item?.title}</CustomText>
            <View style={styles.price_row}>
              <CustomText style={styles.price}>${item?.price}</CustomText>
              <View style={styles.circle} />
              <CustomText style={styles.condition}>
                {item?.watch_condition === 'brand_new'
                  ? 'Brand New'
                  : 'Pre Owned'}
              </CustomText>
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
        setData(chatReducer.getIntersetList?.data);
      }}>
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={() => {
            setModalVisible(!modalVisible);
            setData(chatReducer.getIntersetList?.data);
          }}
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
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={EmptyList}
            ListHeaderComponent={
              isSeller
                ? () => {
                    return (
                      <View style={[styles.listContainer]}>
                        <View
                          style={styles.checkBoxContainer}
                          // onPress={() => onUpdateRow(item)}
                        >
                          <CustomIcon
                            origin={ICON_TYPE.MATERIAL_ICONS}
                            name={
                              true ? 'check-box' : 'check-box-outline-blank'
                            }
                            color={true ? '#00958C' : '#868686'}
                            size={20}
                          />
                        </View>
                        <Pressable
                          onPress={() => setAddModalVisible(true)}
                          style={[
                            styles.product,
                            {
                              borderColor: '#00958C',
                              borderWidth: 1,
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          ]}>
                          <View
                            style={{
                              paddingLeft: 15,
                            }}>
                            <CustomText
                              style={[styles.brandtext, {color: '#00958C'}]}>
                              {'+ Add New Product'}
                            </CustomText>
                          </View>
                        </Pressable>
                      </View>
                    );
                  }
                : null
            }
          />
          <SubmitButton
            lable="Add to interest list"
            onPress={addIntersetList}
          />
        </View>
      </View>
      {/* <AddInterestModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        {...props}
      /> */}
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
    paddingRight: 10,
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
