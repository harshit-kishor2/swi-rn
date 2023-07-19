/* eslint-disable react/react-in-jsx-scope */
import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import PageTitle from '@app/screens/atoms/PageTitle';
import ProductCard from '@app/screens/atoms/ProductCard';
import {useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import Filter from './Filter';

const TrendyWatch = props => {
  const {exploreProduct, onAddWishList, setIsFilter} = props;
  const renderItem = ({item, index}) => {
    return <ProductCard key={index} item={item} />;
  };
  return (
    <View style={{paddingHorizontal: 10}}>
      <PageTitle title={'Check out trendy watches for you'} />
      <FlatList
        horizontal
        // ref={flatlistRef}
        data={exploreProduct?.trendyWatches}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <CustomText>No Data Found</CustomText>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 30,
        }}>
        <PageTitle title={'Top-notch watches'} />
        <Pressable
          onPress={() => {
            setIsFilter(true);
          }}>
          <CustomIcon
            origin={ICON_TYPE.FEATHER_ICONS}
            name={'filter'}
            color={'#000'}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TrendyWatch;

const styles = StyleSheet.create({});
