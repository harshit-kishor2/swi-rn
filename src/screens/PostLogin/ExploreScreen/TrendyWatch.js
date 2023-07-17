import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PageTitle from '@app/screens/atoms/PageTitle';
import ProductCard from '@app/screens/atoms/ProductCard';
import {CustomIcon} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';

const TrendyWatch = props => {
  const renderItem = ({item, index}) => {
    return <ProductCard />;
  };
  return (
    <View style={{height: 450, paddingHorizontal: 10}}>
      <PageTitle title={'Check out trendy watches for you'} />
      <FlatList
        horizontal
        // ref={flatlistRef}
        data={[1, 2, 3, 4, 5, 6, 8]}
        renderItem={renderItem}
        keyExtractor={item => item?.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 30,
        }}>
        <PageTitle title={'Top-notch watches'} />
        <CustomIcon
          origin={ICON_TYPE.FEATHER_ICONS}
          name={'filter'}
          color={'#000'}
        />
      </View>
    </View>
  );
};

export default TrendyWatch;

const styles = StyleSheet.create({});
