import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SPACING} from '../../resources';
import CustomTextInput from '../../components/CustomtextInput';
import Custombutton from '../../components/Button1';
import {pID, updateThirdProductDetail} from '../../redux/addProduct.slice';
import {connect, useDispatch} from 'react-redux';

const SetPriceScreen = ({title, navigation, product_ID}) => {
  const [price, setPrice] = useState();
  const dispatch = useDispatch();
  const value = {
    price: price,
    productID: product_ID,
  };
  const postForm = () => {
    console.log('final form data', value);
    dispatch(updateThirdProductDetail(value));
  };
  return (
    <View style={{marginTop: SPACING.SCALE_30}}>
      <View style={{color: COLORS.PageBackground, backgroundColor: '#F0F2FA'}}>
        <View style={{}}>
          <Text
            style={{
              color: COLORS.HYPERLINK,
              alignSelf: 'center',
              marginTop: 30,
              fontFamily: 'OpenSans-Regular',
              fontSize: 16,
            }}>
            SetPrice
          </Text>
          <Text
            style={{
              color: COLORS.BLACK,
              marginLeft: 5,
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: COLORS.HYPERLINK,
              marginLeft: 5,
              fontFamily: 'OpenSans-Regular',
              fontSize: 16,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            SDG{' '}
          </Text>
        </View>
        <View
          style={[
            styles.container,
            {
              width: '55%',
              height: 80,
            },
          ]}>
          <TextInput
            keyboardType="number-pad"
            maxLength={10}
            textAlign="center"
            style={{fontFamily: 'OpenSans-Regular', width: '100%'}}
            fontSize={40}
            autoFocus={true}
            onChangeText={e => {
              setPrice(e);
              console.log(price);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 50,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              color: COLORS.BLACK,
              fontSize: 14,
            }}>
            Get your watch listed on top
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              color: COLORS.HYPERLINK,
              fontSize: 14,
              textDecorationLine: 'underline',
            }}>
            Boost Now
          </Text>
        </View>
        <Custombutton
          title={'Post now'}
          width={'80%'}
          fontSize={20}
          onPress={postForm}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  product_ID: pID(state),
});
export default connect(mapStateToProps)(SetPriceScreen);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: COLORS.HYPERLINK,
  },
});
