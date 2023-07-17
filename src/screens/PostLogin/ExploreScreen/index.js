import {Container} from '@app/components';
import ProductCard from '@app/screens/atoms/ProductCard';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {FlatList, StyleSheet} from 'react-native';
import Banner from './Banner';
import TrendyWatch from './TrendyWatch';

const ExploreScreen = props => {
  const HEADER = () => {
    return (
      <>
        <Banner />
        <TrendyWatch />
      </>
    );
  };
  const renderItem = () => {
    return <ProductCard />;
  };
  return (
    <Container useSafeAreaView={true}>
      <SearchHeader />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        ListHeaderComponent={HEADER}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
        }}
      />
    </Container>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({});
