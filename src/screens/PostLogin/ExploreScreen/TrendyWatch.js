import {CustomIcon, CustomText} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import PageTitle from '@app/screens/atoms/PageTitle';
import ProductCard from '@app/screens/atoms/ProductCard';
import {FlatList, StyleSheet, View} from 'react-native';

const TrendyWatch = props => {
  const {exploreProduct, onAddWishList} = props;
  const renderItem = ({item, index}) => {
    return <ProductCard key={index} item={item} />;
  };
  return (
    <View style={{height: 500, paddingHorizontal: 10}}>
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
