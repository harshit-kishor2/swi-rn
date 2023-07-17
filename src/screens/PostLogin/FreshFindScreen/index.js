import {Container, Loader} from '@app/components';
import PageTitle from '@app/screens/atoms/PageTitle';
import SearchHeader from '@app/screens/atoms/SearchHeader';
import {FlatList, StyleSheet} from 'react-native';

import ProductCard from '@app/screens/atoms/ProductCard';

const FreshFindScreen = () => {
  const renderItem = ({item, index}) => {
    return <ProductCard key={index} item={item} />;
  };
  return (
    <Container useSafeAreaView={true}>
      <SearchHeader />
      <PageTitle title={'Fresh Finds'} />
      {true ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          data={Array(35).fill({})}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
        />
      ) : (
        <Loader size={20} />
      )}
    </Container>
  );
};

export default FreshFindScreen;

const styles = StyleSheet.create({});
