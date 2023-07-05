import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  Linking,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import Search from '../../components/Search';
import {IMAGES, SPACING} from '../../resources';
import styles from './styles';
import StoryScreen from '../../components/StoryScreen';
import CustomText from '../../components/CustomText';
import Banner from '../../components/BannerComponent';
import {useDispatch, useSelector} from 'react-redux';
import {exploreProductListing} from '../../redux/explore.slice';
import {exploreActions} from '../../redux/explore.slice';

const ExploreScreen = () => {
  const {error, loading, products} = useSelector(
    state => state?.exploreReducer,
  );
  console.log(error, loading, products, 'fgdjhgfdsghfjkdshjkfhskh');
  useEffect(() => {
    dispatch(exploreProductListing());
  }, []);
  const image = [
    {
      id: '1',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/dummy-user-image-url-300x200.jpg',
      link: 'https://example.com',
    },
    {
      id: '2',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/online-dummy-image-url-300x201.jpg',
      link: 'https://google.com',
    },
    {
      id: '3',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      link: null,
    },
    {
      id: '4',
      source:
        'https://www.pakainfo.com/wp-content/uploads/2021/09/dummy-user-image-url-300x200.jpg',
      link: 'https://openai.com',
    },
  ];
  const handleItemClick = index => {
    const clickedItem = image[index];
    if (clickedItem.link) {
      Linking.openURL(clickedItem.link);
    }
  };
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <StoryScreen NoPadding={true}>
        <View style={styles.searchViewStyle}>
          <Search
            width={SPACING.SCALE_300}
            placeholder={'Search By Product/ Brand/ Model'}
            onChange={e => {
              console.log(e);
            }}
          />
          <Pressable
            onPress={() => {
              Alert.alert('pressed');
            }}>
            <Image
              source={IMAGES.bell}
              style={{marginLeft: SPACING.SCALE_10}}
            />
          </Pressable>
        </View>

        <Banner
          image={image}
          width={Dimensions.get('window').width}
          height={200}
          onItemClick={handleItemClick}
        />

        <View>
          <CustomText
            text={'Check out trendy watches for you'}
            fontSize={20}
            fontFamily={'Cabin - Bold'}
            fontWeight={700}
          />
        </View>
      </StoryScreen>
    </KeyboardAvoidingView>
  );
};

export default ExploreScreen;
