import {FontsConst} from '@app/assets/assets';
import {CustomText, Spacer, SubmitButton} from '@app/components';
import useKeyboardVisible from '@app/hooks/useKeyboardVisible';
import {useState} from 'react';
import {Keyboard, Modal, Pressable, StyleSheet, View} from 'react-native';
import {Card, TextInput} from 'react-native-paper';

const MakeOfferModal = ({modalVisible, setModalVisible}) => {
  const [amount, setAmount] = useState(null);
  const keyboardVisible = useKeyboardVisible();

  const onOfferClick = () => {
    if (!amount) {
      return;
    } else if (amount <= 0) {
      return;
    } else {
      const numericValue = amount?.replace(/[^0-9.]/g, '');
      const props = {
        price: numericValue,
      };
      console.log('props', props);

      setAmount('');
    }
  };

  const onChangeText = v => {
    const numericValue = v.replace(/[^0-9.]/g, '');
    // Format the numeric value with commas every three digits
    const formattedNumber = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // console.log(price,"Price Value ====================>>>>>>>>>>>>>>")
    if (v.length <= 12) {
      setAmount(formattedNumber);
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
          onPress={() =>
            keyboardVisible
              ? Keyboard.dismiss()
              : setModalVisible(!modalVisible)
          }
        />
        <Card style={styles.card_container} onPress={() => Keyboard.dismiss()}>
          <View style={styles.border} />
          <View style={styles.grouped}>
            <CustomText style={styles.offer_text}>Offer Price</CustomText>
            <TextInput
              keyboardType="numeric"
              mode="flat"
              underlineStyle={styles.input_underline}
              style={{
                alignSelf: 'center',
              }}
              contentStyle={styles.input_content}
              value={amount}
              onChangeText={onChangeText}
            />
            <Spacer height={30} />
            <SubmitButton lable="Send" onPress={onOfferClick} />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default MakeOfferModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  backdrop: {
    height: '60%',
  },
  card_container: {
    height: '40%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  border: {
    width: 60,
    height: 3,
    backgroundColor: '#B1B1B1',
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: 'center',
  },
  offer_text: {
    color: '#00958C',
    fontFamily: FontsConst.OpenSans_SemiBold,
    alignSelf: 'center',
    fontSize: 16,
  },
  grouped: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '100%',
  },
  input_content: {
    minWidth: 150,
    fontSize: 30,
    backgroundColor: '#fff',
    fontFamily: FontsConst.OpenSans_SemiBold,
  },
  input_underline: {
    height: 2,
    backgroundColor: '#00958C',
  },
});
