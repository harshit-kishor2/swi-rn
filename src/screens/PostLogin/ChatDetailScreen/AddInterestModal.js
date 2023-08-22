import {FontsConst} from '@app/assets/assets';
import {CustomText, Spacer, SubmitButton} from '@app/components';
import {showAlert} from '@app/helper/commonFunction';
import {useEffect, useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import DropDownWithModel from '../AddProduct1/DropDownWithModel';

const AddInterestModal = props => {
  const {
    modalVisible,
    setModalVisible,
    authReducer,
    exploreProduct,
    route,
    productReducer,
    getAllProductModel,
    onAddDraftInteresetList,
    getIntersetList,
  } = props;
  const {chat_item} = route.params;

  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [watchCondition, setWatchCondition] = useState('brand_new');

  useEffect(() => {
    if (brand?.brand_id) {
      getAllProductModel({id: brand?.brand_id});
    }
  }, [brand]);

  const sellerID = exploreProduct?.productDetails?.user?.id;
  const userID =
    authReducer.userProfileDetails.id ===
    exploreProduct?.productDetails?.user?.id
      ? chat_item.user_id
      : authReducer.userProfileDetails.id;

  const isSeller =
    exploreProduct?.productDetails?.user?.id ===
    authReducer.userProfileDetails.id;

  const addDraftIntersetList = () => {
    if (brand?.brand_id && model?.model_id) {
      onAddDraftInteresetList({
        seller_id: sellerID,
        user_id: userID,
        model_id: model.model_id,
        brand_id: brand.brand_id,
        condition: watchCondition,
      }).then(res => {
        if (res?.type.includes('fulfilled')) {
          getIntersetList({
            seller_id: sellerID,
            user_id: userID,
            keyword: '',
          });
          setBrand(null);
          setModel(null);
          setModalVisible(false);
        }
      });
    } else {
      // showAlert({
      //   title: 'Alert!',
      //   message: 'Choose brand and model of watch.',
      // });
    }
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
          <CustomText style={styles.interest_text}>Add new watch</CustomText>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexGrow: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <DropDownWithModel
                label={'Choose Brand'}
                data={productReducer?.getAllBrand}
                isRequired={true}
                onClick={(item, text) => {
                  setBrand({
                    brand_id: item.name === 'Others' ? text : item?.id,
                    new_brand: item.name === 'Others' ? true : false,
                  });
                  setModel({
                    model_id: '',
                    new_model: false,
                  });
                }}
                value={brand?.brand_id ?? ''}
                backgroundColor={'#fff'}
              />
              <DropDownWithModel
                label={'Model'}
                data={productReducer?.getAllProductModel}
                isRequired={true}
                onClick={(item, text) => {
                  setModel({
                    model_id: item.name === 'Others' ? text : item?.id,
                    new_model: item.name === 'Others' ? true : false,
                  });
                }}
                value={''}
                backgroundColor={'#fff'}
              />
            </View>
            <Spacer height={30} />

            <>
              <CustomText style={{color: '#7C7C7C'}}>
                Watch Condition{' '}
                <CustomText style={{color: 'red'}}>*</CustomText>
              </CustomText>
              <View style={{flexDirection: 'row'}}>
                <SubmitButton
                  lable="Brand New"
                  mode={
                    watchCondition === 'brand_new' ? 'contained' : 'outlined'
                  }
                  buttonColor={
                    watchCondition === 'brand_new' ? '#00958C' : 'transparent'
                  }
                  onPress={() => setWatchCondition('brand_new')}
                  textColor={
                    watchCondition === 'brand_new' ? 'white' : '#00958C'
                  }
                  buttonStyle={{
                    borderRadius: 50,
                    height: 40,
                    borderColor:
                      watchCondition === 'brand_new' ? 'white' : '#00958C',
                  }}
                />
                <SubmitButton
                  onPress={() => setWatchCondition('pre_owned')}
                  lable="Pre-Owned"
                  mode={
                    watchCondition === 'pre_owned' ? 'contained' : 'outlined'
                  }
                  buttonColor={
                    watchCondition === 'pre_owned' ? '#00958C' : 'transparent'
                  }
                  textColor={
                    watchCondition === 'pre_owned' ? 'white' : '#00958C'
                  }
                  buttonStyle={{
                    borderRadius: 50,
                    height: 40,
                    borderColor:
                      watchCondition === 'pre_owned' ? 'white' : '#00958C',
                  }}
                />
              </View>
            </>
            <View
              style={{
                flex: 1,
              }}
            />
            <SubmitButton
              lable="Add to interest list"
              onPress={addDraftIntersetList}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddInterestModal;

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
    justifyContent: 'flex-start',
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
